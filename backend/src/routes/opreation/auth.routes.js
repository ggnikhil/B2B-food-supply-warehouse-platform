import { registerUserController, loginUserController, getMeController } from "../../controllers/operation/auth.controller.js";
import { updateUserIdCountController } from "../../controllers/operation/userId.controller.js";
import { authenticateUserMiddleware, authorizationmidleware } from "../../middlewares/operation/auth.middleware.js";

import express from "express";

const authRouter = express.Router();

authRouter.post("/register", authenticateUserMiddleware, authorizationmidleware("MANAGER", "SUPERVISOR"), registerUserController);
authRouter.post("/login", loginUserController);
authRouter.get("/getMe", authenticateUserMiddleware, getMeController);
authRouter.post("/update", updateUserIdCountController);

export default authRouter;