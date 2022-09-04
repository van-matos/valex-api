import { Router } from "express";

import * as rechargeController from "../controllers/rechargeController";
import { validateSchema } from "../middlewares/validateSchema";
import * as rechargeSchema from "../schemas/rechargeSchema";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:cardId", validateSchema(rechargeSchema.addRechargeSchema), rechargeController.newRecharge)

export default rechargeRouter;