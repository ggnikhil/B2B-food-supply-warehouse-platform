import express from "express"
import cookieParser from "cookie-parser"
import productRouter from "./routes/product.routes.js"
import binLabelRouter from "./routes/binLabel.routes.js"
import authRouter from "./routes/auth.routes.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()
app.use(cookieParser())


app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api/bin",binLabelRouter)

app.use(errorHandler)

export default app