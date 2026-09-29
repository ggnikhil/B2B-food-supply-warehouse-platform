import { createProduct } from "../controllers/product.controller.js";
import express from "express"

const productRouter = express.Router()

productRouter.post("/CreateProduct",createProduct)

export default productRouter