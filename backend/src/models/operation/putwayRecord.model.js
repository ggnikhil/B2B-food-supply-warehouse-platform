import mongoose from "mongoose";

const putawayRecordSchema = new mongoose.Schema(
    {
        productId: {
            type: Number,
            ref: "Product",
            required: [true, "Product ID is required"],
            index: true
        },

        warehouseCode: {
            type: String,
            required: [true, "Warehouse code is required"],
            trim: true
        },

        binCode: {
            type: String,
            required: [true, "Bin code is required"],
            trim: true
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 0
        },

        putawayAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const putawayRecordModel = mongoose.model("PutawayRecord", putawayRecordSchema);