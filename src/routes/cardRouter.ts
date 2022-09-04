import { Router } from "express";

import * as cardController from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchema from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.get("/balance/:cardId", cardController.getCardStatement);

cardRouter.post("/cards/:employeeId", validateSchema(cardSchema.typeSchema), cardController.addNewCard);

cardRouter.patch("/activation/:cardId", validateSchema(cardSchema.activationSchema), cardController.activateCard);

export default cardRouter;