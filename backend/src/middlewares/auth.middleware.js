import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
import { userModel } from "../models/user.model.js"

export const authenticateUserMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token
        console.log("token:", token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECERT)

        const verifyUser = await userModel.findOne({ userId: decoded.userId })

        if (!verifyUser) {
            return res.status(201).json({
                success: true,
                message: "Unauthorized User"
            })
        }

        req.user = verifyUser
        next()
        
    } catch (err) {
        err.status = 500,
            next(err)
    }
}