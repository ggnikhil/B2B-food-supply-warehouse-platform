import mongoose from "mongoose";

const userIdCountSchema = new mongoose.Schema({
    userIdCount:{
        type:Number,
        default:999
    }
})

export const userIdCountModel = mongoose.model("userId",userIdCountSchema)