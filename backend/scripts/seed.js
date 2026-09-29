import "dotenv/config";
import mongoose from "mongoose";
import XLSX from "xlsx";
import { productMasterModel } from "../src/models/productMaster.model.js";

const DRY_RUN = process.argv.includes("--dry");

const clean = (v) => String(v ?? "").trim();

const toBool = (v) => String(v ?? "").trim().toUpperCase() === "TRUE";

// Zaroori number: khali ho to error
const toNumber = (v, fieldName) => {
    if (v === undefined || v === null || String(v).trim() === "") {
        throw new Error(`${fieldName} is required`);
    }

    const number = Number(v);

    if (Number.isNaN(number)) {
        throw new Error(`${fieldName} must be a valid number`);
    }

    return number;
};

// Optional number: khali ho to defaultValue (rating ke liye 0)
const toOptionalNumber = (v, fieldName, defaultValue = 0) => {
    if (v === undefined || v === null || String(v).trim() === "") {
        return defaultValue;
    }

    const number = Number(v);

    if (Number.isNaN(number)) {
        throw new Error(`${fieldName} must be a valid number`);
    }

    return number;
};

const parseHighlights = (labels, values) => {
    const labelList = clean(labels)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

    const valueList = clean(values)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

    if (labelList.length !== valueList.length) {
        throw new Error("Highlight labels and values count do not match");
    }

    return labelList.map((label, index) => ({
        label,
        value: valueList[index]
    }));
};

function rowToProduct(r) {
    return {
        productName: clean(r.productName).replace(/\s+/g, " "),
        displayName: clean(r.displayName),
        description: clean(r.description),

        classification: {
            foodType: clean(r.foodType),
            zone: clean(r.zone),
            category: clean(r.category),
            tags: clean(r.tags)
        },

        packaging: {
            baseUnit: clean(r.baseUnit),
            packSize: clean(r.packSize),
            netWeightKg: toNumber(r.netWeightKg, "netWeightKg"),
            grossWeightKg: toNumber(r.grossWeightKg, "grossWeightKg")
        },

        pricing: {
            mrp: toNumber(r.mrp, "mrp"),
            sellingPrice: toNumber(r.sellingPrice, "sellingPrice"),
            gstRate: toNumber(r.gstRate, "gstRate")
        },

        compliance: {
            shelfLifeDays: toNumber(r.shelfLifeDays, "shelfLifeDays"),
            perishable: toBool(r.perishable),
            storageTemperature: clean(r.storageTemperature) || undefined
        },

        media: {
            image: clean(r.image)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            thumbnail: clean(r.thumbnail)
        },

        highlights: parseHighlights(r.highlightLabel, r.highlightValue),

        status: {
            active: toBool(r.active)
        },

        rating: {
            ratingValue: toOptionalNumber(r.ratingValue, "ratingValue", 0),
            ratingCount: toOptionalNumber(r.ratingCount, "ratingCount", 0)
        }
    };
}

async function main() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("MongoDB connection error: Database URI is not configured.");
        process.exitCode = 1;
        return;
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");

    const wb = XLSX.readFile("./data/productdata.xlsx");
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    console.log(`Products loaded from Excel: ${rows.length}`);

    if (rows.length === 0) {
        throw new Error("No products found in Excel file.");
    }

    const usedIds = new Set(
        (await productMasterModel.find({}, "productId")).map((p) => p.productId)
    );

    const newId = () => {
        let id;
        do {
            id = Math.floor(Math.random() * 9000) + 1;
        } while (usedIds.has(id));
        usedIds.add(id);
        return id;
    };

    const seenNames = new Set();
    const failed = [];
    let ok = 0;

    for (const [i, r] of rows.entries()) {
        const rowNo = i + 2; // Excel me header row 1 hai

        try {
            const product = rowToProduct(r);
            const key = product.productName.toLowerCase();

            if (!product.productName) {
                throw new Error("Product name is required");
            }

            if (seenNames.has(key)) {
                throw new Error("Duplicate product name in Excel");
            }

            if (product.pricing.sellingPrice > product.pricing.mrp) {
                throw new Error("Selling price cannot be greater than MRP");
            }

            if (product.packaging.grossWeightKg < product.packaging.netWeightKg) {
                throw new Error("Gross weight cannot be less than net weight");
            }

            if (product.rating.ratingValue < 0 || product.rating.ratingValue > 5) {
                throw new Error("Rating value must be between 0 and 5");
            }

            if (product.rating.ratingCount < 0) {
                throw new Error("Rating count cannot be negative");
            }

            if (DRY_RUN) {
                await new productMasterModel({ ...product, productId: 1 }).validate();
            } else {
                await productMasterModel.create({ ...product, productId: newId() });
            }

            seenNames.add(key);
            ok++;
        } catch (err) {
            failed.push({
                excelRow: rowNo,
                name: clean(r.productName),
                error: err.message
            });
        }
    }

    console.log(
        `${DRY_RUN ? "Validation completed" : "Products inserted"}: ${ok}, Failed: ${failed.length}`
    );

    if (failed.length) {
        console.table(failed);
    }
}

main()
    .catch((err) => {
        console.error("Script error:", err.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });