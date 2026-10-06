import mongoose from "mongoose";


const inventorySchema = new mongoose.Schema({
    productId: {
        type: Number,
        ref: "Product",
        required: [true, "product ID is reuired"],
        index: true
    },
    warehouseCode: {
        type: String,
        required: [true, "Warehouse Code is required"],
        index: true
    },
    binCode: {
        type: String,
        required: [true, "Bin Code is required"],
        index: true
    },
    stock: {
        onHand: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        reserved: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    capacity: {
        type: String,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
    timestamps:true
})

inventorySchema.index(
    {productId:1,warehouseCode:1,binCode:1},
    {unique:true}
)

inventorySchema.virtual("stock.remainingStock").get(function(){
    return this.stock.onHand - this.stock.reserved
})

inventorySchema.set("toJSON", { virtuals: true });
inventorySchema.set("toObject", { virtuals: true });

export const inventoryModel = new mongoose.model("inventory",inventorySchema)