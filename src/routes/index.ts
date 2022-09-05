import { Router } from "express";

import cardRouter from "./cardRouter";
import paymentRouter from "./paymentRouter";
import rechargeRouter from "./rechargeRouter";

const router = Router();

router.use(cardRouter);
router.use(paymentRouter);
router.use(rechargeRouter);

export default router;