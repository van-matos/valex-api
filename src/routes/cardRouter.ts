import { Router } from "express";

import * as cardController from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchema from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post("/cards/:id", validateSchema(cardSchema.typeSchema), cardController.addNewCard);

cardRouter.patch("/activation/:id", validateSchema(cardSchema.activationSchema), cardController.activateCard);

export default cardRouter;