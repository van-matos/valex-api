import { Router } from "express";

import * as paymentController from "../controllers/paymentController";
import { validateSchema } from "../middlewares/validateSchema";
import * as paymentSchema from "../schemas/paymentSchema";

const paymentRouter = Router();

paymentRouter.post("/payment/:businessId", validateSchema(paymentSchema.addPaymentSchema), paymentController.newPayment);

export default paymentRouter;