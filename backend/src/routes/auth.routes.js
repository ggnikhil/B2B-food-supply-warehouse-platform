import { registerUserController,loginUserController, getMeController } from "../controllers/auth.controller.js";
import { updateUserIdCountController } from "../controllers/userId.controller.js";
import { authenticateUserMiddleware } from "../middlewares/auth.middleware.js";

import express from "express"

const authRouter = express.Router()

authRouter.post("/register",registerUserController)
authRouter.post("/login",loginUserController)
authRouter.get("/getMe",authenticateUserMiddleware,getMeController)
authRouter.post("/update",updateUserIdCountController)


export default authRouter