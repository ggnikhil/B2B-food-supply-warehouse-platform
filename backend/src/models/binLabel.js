import mongoose from "mongoose";


const binLocationLabelSchema = new mongoose.Schema(
    {
        binId: {
            type: Number,
            required: [true, "Bin ID is required"],
            unique: true,
            immutable: true,
            min: 1
        },

        
        binCode: {
            type: String,
            required: [true, "Bin code is required"],
            trim: true,
            uppercase: true,
            immutable: true
        },

        warehouseCode: {
            type: String,
            required: [true, "Warehouse code is required"],
            trim: true,
            uppercase: true,
            immutable: true
        },

        zone: {
            type: String,
            required: [true, "Zone is required"],
            enum: ["FNV", "AMBIENT", "BULK", "EGG", "HIGHVALUE","POULTRY", "FROZEN", "RTS", "ONION_POTATO", "DAIRY"],
            trim: true
        },

        binType: {
            type: String,
            required: [true, "Bin type is required"],
            enum: ["SMALL", "BIG"]
        },

        capacityInKg: {
            type: Number,
            min: 0,
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true, versionKey: false }
);

binLocationLabelSchema.index(
    { warehouseCode: 1, binCode: 1 },
    { unique: true }
);

binLocationLabelSchema.index({ warehouseCode: 1, zone: 1, binType: 1 });

export const binLocationLabelModel = mongoose.model(
    "BinLocation",
    binLocationLabelSchema
);