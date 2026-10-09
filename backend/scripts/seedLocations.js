import mongoose from "mongoose";
import { binLocationLabelModel } from "../src/models/binLabel.js";
import dotenv from "dotenv";
import zoneLayout from "../data/zoneLayout.js";

dotenv.config();

const warehouse_code = "MUM3"
const bin_capacity_in_kg = {
    SMALL: 50,
    BIG: 600
}

async function seed() {
    await mongoose.connect(process.env.MONGO_URI)

    let binIdCount = 10000
    const binLocation = []

    for (const zone of zoneLayout) {

        if (zone.lines) {
            for (const line of zone.lines) {
                for (const rack of zone.racks) {
                    for (const floor of zone.floors) {
                        for (const position of zone.positions) {

                            binLocation.push({
                                binId: binIdCount,
                                binCode: `${line}-${rack}-${floor}-${position}`,
                                warehouseCode: warehouse_code,
                                zone: zone.zone,
                                binType: "SMALL",
                                capacityInKg: bin_capacity_in_kg.SMALL
                            })
                            binIdCount++
                        }
                    }
                }
            }
        }

        for (let i = 1; i <= zone.bigBinCount; i++) {
            binLocation.push({
                binId: binIdCount,
                binCode: `${zone.bigBinPrefix}${String(i).padStart(2, "0")}`,
                warehouseCode: warehouse_code,
                zone: zone.zone,
                binType: "BIG",
                capacityInKg: bin_capacity_in_kg.BIG
            })
            binIdCount++
        }
    }

    if (binLocation.length === 0) {
        console.log("Bin not Found")
    } else {
        await binLocationLabelModel.insertMany(binLocation)
        console.log(`Total ${binLocation.length} bin added in database`)
    }

    await mongoose.disconnect();
}

seed().catch(async (err) => {
    console.error("Seed failed:", err.message);
    await mongoose.disconnect();
    process.exit(1);
});
