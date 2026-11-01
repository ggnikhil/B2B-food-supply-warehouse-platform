import { registerUserController } from "../controllers/auth.controller.js";
import { updateUserIdCountController } from "../controllers/userId.controller.js";

import express from "express"

const authRouter = express.Router()

authRouter.post("/register",registerUserController)
authRouter.post("/update",updateUserIdCountController)


export default authRouter