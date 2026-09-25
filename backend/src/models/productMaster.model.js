import mongoose from "mongoose"

const productMaster = new mongoose.Schema({
    "productId":{
        type:String,
        unique: true,
        required:[true,"Product id must be required"]
    }
})
