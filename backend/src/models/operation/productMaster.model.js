import mongoose from "mongoose";

export const PRODUCT_CATEGORIES = [
    "MENU_ADDONS",
    "FRESH_DAIRY",
    "BUTTER_CHEESE",
    "FRUITS_VEGETABLES",
    "CANNED_IMPORTED",
    "SAUCES_SEASONING",
    "MASALA_SALT_SUGAR",
    "PACKAGING_MATERIAL",
    "CHICKEN_EGGS",
    "FROZEN_INSTANT_FOOD",
    "BAKERY_CHOCOLATES",
    "EDIBLE_OILS",
    "BEVERAGES_MIXERS",
    "CLEANING_CONSUMABLES",
    "PULSES",
    "FLOURS",
    "DRY_FRUITS_NUTS",
    "RICE_PRODUCTS",
    "FISH_SEAFOOD",
    "MUTTON_DUCK"
];

const productMasterSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
        required: [true, "Product id is required"],
        immutable: true
    },

    productName: {
        type: String,
        unique: true,
        required: [true, "Product name is required"],
        trim: true
    },

    displayName: {
        type: String,
        required: [true, "Display name is required"],
        trim: true
    },

    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true
    },

    brandSlug: {
        type: String,
        lowercase: true,
        trim: true
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },

    classification: {
        foodType: {
            type: String,
            enum: ["veg", "non-veg"],
            required: [true, "Food type is required"],
            trim: true
        },

        zone: {
            type: String,
            required: [true, "Zone is required"],
            trim: true,
            enum: ["FNV", "AMBIENT", "BULK", "EGG", "HIGHVALUE", "POULTRY", "FROZEN", "RTS", "ONION_POTATO", "DAIRY"]
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            enum: PRODUCT_CATEGORIES
        },

        tags: {
            type: [{ type: String, trim: true, lowercase: true }],
            default: []
        }
    },

    packaging: {
        baseUnit: {
            type: String,
            required: [true, "Base unit is required"],
            trim: true,
            enum: ["kg", "g", "litre", "ml", "piece", "dozen", "packet", "bag", "box"]
        },

        packSize: {
            type: String,
            required: [true, "Pack size is required"],
            trim: true
        },

        // Sirf count wale packs ke liye (jaise 9 pc). Kg wale products me khali.
        packQuantity: {
            type: Number,
            min: 1
        },

        netWeightKg: {
            type: Number,
            required: [true, "Net weight is required"],
            min: 0
        },

        grossWeightKg: {
            type: Number,
            required: [true, "Gross weight is required"],
            min: 0
        }
    },

    pricing: {
        mrp: {
            type: Number,
            required: [true, "MRP is required"],
            min: 0
        },

        sellingPrice: {
            type: Number,
            required: [true, "Selling price is required"],
            min: 0
        },

        gstRate: {
            type: Number,
            default: 0,
            min: 0
        }
    },

    compliance: {
        shelfLifeDays: {
            type: Number,
            required: [true, "Shelf life days is required"],
            min: 0
        },

        perishable: {
            type: Boolean,
            required: [true, "Perishable is required"]
        },

        // Khali ho to UI me ye row hide karo
        storageTemperature: {
            type: String,
            trim: true
        }
    },

    media: {
        image: {
            type: [String],
            required: [true, "At least one image is required"],
            validate: {
                validator: (arr) => arr.length > 0,
                message: "At least one image is required"
            }
        },

        thumbnail: {
            type: String,
            required: [true, "Thumbnail is required"],
            trim: true
        }
    },

    highlights: [
        {
            _id: false,
            label: { type: String, trim: true },
            value: { type: String, trim: true }
        }
    ],

    status: {
        active: {
            type: Boolean,
            default: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },

    rating: {
        ratingValue: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        ratingCount: {
            type: Number,
            min: 0,
            default: 0
        }
    }
}, {
    timestamps: true
});

// "Mother Dairy" -> "mother-dairy"
productMasterSchema.pre("validate", function () {
    if (this.brand) {
        this.brandSlug = this.brand
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }
});

productMasterSchema.index({ brandSlug: 1, "status.active": 1, "status.isDeleted": 1 });
productMasterSchema.index({ "classification.category": 1, "status.active": 1, "status.isDeleted": 1 });

export const productMasterModel = mongoose.model("Product", productMasterSchema);