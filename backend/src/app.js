import express from "express"
import productRouter from "./routes/product.routes.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(express.json())
app.use("/api/product",productRouter)


app.use(errorHandler)

export default app