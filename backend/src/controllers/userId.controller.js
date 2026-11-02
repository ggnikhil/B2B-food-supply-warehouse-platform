import { userIdCountModel } from "../models/userIdCount.model.js";

export async function updateUserIdCountController(req, res, next) {
    try {

        const currentCount = await userIdCountModel.findOne().select("userIdCount")

        const updateCount = currentCount.userIdCount + 1

        const updateuserIdCount = await userIdCountModel.findOneAndUpdate(
            {},
            { userIdCount: updateCount },
            { new: true }
        ).select("userIdCount");

        res.status(200).json({
            message:"user count updated successfully"
        })

    } catch (err) {
        err.status = 500
        next(err)
    }
}