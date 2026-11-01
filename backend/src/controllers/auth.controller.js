import { userModel } from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken"

export async function sendTokenResponse(user, res, message) {

    const jwt = jwt.sign({
        userId: user.userId,
        name: user.name,
        role: user.role,
        warehouseCode: user.warehouseCode,
    }, config.JWT_SECERT, {
        expiresIn: "7d"
    })

    return res.status(200).json({
        message: "User created successfully",
        success: true,
        user: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            role: user.role,
            department: user.department,
            warehouseCode: user.warehouseCode,
            shiftHour: user.shiftHour,
            profilePhoto: user.profilePhoto,
            joiningDate: user.joiningDate,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
}


export async function registerUserController(req, res, next) {
    try {

        const {
            userId,
            name,
            email,
            password,
            contactNumber,
            role,
            department,
            warehouseCode,
            shiftHour,
            profilePhoto,
            joiningDate,
            status: {
                isActive,
                isEmailVerified,
                isBackgroundVerified
            } = {}
        } = req.body;


        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { email }, { contactNumber }
            ]
        })

        if (isUserAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User already Exists with this email or Contact number"
            })
        }

        const user = await userModel.create({
            userId,
            name,
            email,
            password,
            contactNumber,
            role,
            department,
            warehouseCode,
            shiftHour,
            profilePhoto,
            joiningDate,
            createdBy,
            updatedBy
        })

        await sendTokenResponse(user, res, "User registered successfully")

    } catch (err) {
        err.status = 500,
        next(err)
    }

}