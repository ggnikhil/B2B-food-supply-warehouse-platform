import { productMasterModel } from "../models/productMaster.model.js";

export async function createProduct(req, res) {

    async function generateProductId() {
        let id;
        let exists = true;

        while (exists) {
            id = Math.floor(Math.random() * 9000) + 1;
            exists = await productMasterModel.exists({ productId: id })
        }

        return id
    }

    const {
        productName,
        displayName,
        description,
        classification: {
            foodType,
            zone,
            category,
            tags
        } = {},
        packaging: {
            baseUnit,
            packSize,
            netWeightKg,
            grossWeightKg
        } = {},
        pricing: {
            mrp,
            sellingPrice,
            gstRate
        } = {},
        compliance: {
            shelfLifeDays,
            perishable,
            storageTemperature
        } = {},
        media: {
            image,
            thumbnail
        } = {},
        highlights,
        status: {
            active,
            isDeleted
        } = {},
        rating:{
            ratingValue,
            ratingCount
        } = {}

    } = req.body

    const isProductAlreadyExist = await productMasterModel.findOne({ productName })

    if (isProductAlreadyExist) {
        return res.status(400).json({
            success: false,
            message: "Product Name is already exists"
        })
    }

    const productId = await generateProductId();
    
    const Product = await productMasterModel.create({
        productId,
        productName,
        displayName,
        description,
        classification: {
            foodType,
            zone,
            category,
            tags
        },
        packaging: {
            baseUnit,
            packSize,
            netWeightKg,
            grossWeightKg
        },
        pricing: {
            mrp,
            sellingPrice,
            gstRate
        },
        compliance:{
            shelfLifeDays,
            perishable,
            storageTemperature
        },
        media: {
            image,
            thumbnail
        },
        highlights,
        status: {
            active,
            isDeleted
        },
        rating:{
            ratingValue,
            ratingCount
        }
    })

    res.status(201).json({
        success:true,
        message:"Product created Successfully",
        Product
    })
}

