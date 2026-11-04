import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/opreation/auth.routes.js";
import productRouter from "./routes/opreation/product.routes.js";
import binLabelRouter from "./routes/opreation/binLabel.routes.js";
import { errorHandler } from "./middlewares/operation/errorHandler.middleware.js";

const app = express()
app.use(cookieParser())


app.use(express.json())
app.use("/api/operation/auth",authRouter)
app.use("/api/operation/product",productRouter)
app.use("/api/operation/bin",binLabelRouter)

app.use(errorHandler)

export default app