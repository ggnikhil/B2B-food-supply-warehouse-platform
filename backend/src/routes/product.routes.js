import { createProduct,deleteProductById,getAllProduct, getProductById, updatePorductDetailById, } from "../controllers/product.controller.js";
import { authenticateUserMiddleware } from "../middlewares/auth.middleware.js";
import express from "express"

const productRouter = express.Router()

productRouter.post("/CreateProduct",authenticateUserMiddleware,createProduct)
productRouter.get("/FetchAllProduct",getAllProduct)
productRouter.get("/fetchProduct/:productId",getProductById)
productRouter.patch("/upadateProductDetail/:productId",updatePorductDetailById)
productRouter.delete("/deleteProduct/:productId",deleteProductById)

export default productRouter
