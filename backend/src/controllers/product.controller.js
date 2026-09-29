import { productMasterModel } from "../models/productMaster.model.js";

export async function createProduct(req,res) {

    async function generateProductId(){
        let id;
        let exists = true;

        while (exists){
            id = Math.floor(Math.random()*9000)+1;
            exists = await productMasterModel.exists({productId:id})
        }

        return id
    }

    const {
        productId,
        productName,
        description,
        classification:{
            foodType,
            zone,
            category,
            tags
        } = {},
        packaging:{
            baseUnit,
            packSize,
            netWeightKg,
            grossWeightKg
        } = {},
        pricing:{
            mrp,
            sellingPrice,
            gstRate
        } = {},
        media:{
            image,
            thumbnail
        } = {},
        highlights,
        status:{
            active,
            isDeleted
        } = {}

    } = req.body

    const isProductAlreadyExist = await productMasterModel.findOne({
        $or:[
            {productId},{productName}
        ]
    })

    if(isProductAlreadyExist){
        return res.status(400).json({
            success: false,
            message:"Product is already exist with this credentials"
        })
    }

}