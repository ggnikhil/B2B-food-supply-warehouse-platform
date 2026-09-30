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
        rating: {
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
        compliance: {
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
        rating: {
            ratingValue,
            ratingCount
        }
    })

    res.status(201).json({
        success: true,
        message: "Product created Successfully",
        Product
    })
}

export async function getAllProduct(req, res, next) {
    try {
        const products = await productMasterModel.find({ "status.isDeleted": false }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: "All products data fetch Successfully",
            count: products.length,
            products
        })

    } catch (err) {
        err.status = 500
        next(err)
    }
}

export async function getProductById(req, res, next) {
    try {

        const id = req.params.productId

        const product = await productMasterModel.findOne({
            productId: id,
            "status.isDeleted": false
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found by this Product ID"
            })
        }

        res.status(200).json({
            success: true,
            message: "product found successfully",
            product
        })

        console.log(id)

    } catch (err) {
        err.status = 500,
            next(err)
    }
}

export async function updatePorductDetailById(req, res, next) {
    try {

        const id = req.params.productId

        const product = await productMasterModel.findOneAndUpdate(
            { productId: id, "status.isDeleted": false },
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "product Update successfully",
            product
        })

        console.log(id)
    } catch (err) {
        err.status = 500
        next(err)
    }
}

export async function deleteProductById(req, res, next) {
    try {
        const id = req.params.productId

        const product = await productMasterModel.findOneAndUpdate(
            { productId: id, "status.isDeleted": false },
            { $set: { "status.isDeleted": true } },
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}
