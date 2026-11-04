import express from "express";
import { generateBinLabelByBinCode } from "../../controllers/operation/binLable.controller.js";

const binLabelRouter = express.Router();

binLabelRouter.post("/CreateLabel", generateBinLabelByBinCode);

export default binLabelRouter;