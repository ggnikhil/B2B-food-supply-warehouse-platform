import { userModel } from "../../models/operation/user.model.js";
import { userIdCountModel } from "../../models/operation/userIdCount.model.js";
import { config } from "../../config/config.js";
import jwt from "jsonwebtoken";

export async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        userId: user.userId,
        name: user.name,
        role: user.role,
        warehouseCode: user.warehouseCode,
    }, config.JWT_SECERT, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    return res.status(200).json({
        message: message,
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

        const Genrated = await userIdCountModel.findOneAndUpdate(
            {},
            { $inc: { userIdCount: 1 } },
            { new: true }
        ).select("userIdCount");

        const newUserId = Genrated.userIdCount;

        const user = await userModel.create({
            userId: newUserId,
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
        })

        await sendTokenResponse(user, res, "User registered successfully")

    } catch (err) {
        err.status = 500,
            next(err)
    }

}

export async function loginUserController(req, res, next) {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email and Password"
            })
        }

        const givePassword = await user.comparePassword(password)

        if (!givePassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email and Password"
            })
        }

        await sendTokenResponse(user, res, "User Login Successfully")

    } catch (err) {
        err.status = 500,
            next(err)
    }
}

export async function getMeController(req, res, next) {
    console.log(req.user.userId)
}

