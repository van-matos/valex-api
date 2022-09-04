import { Router } from "express";

import * as cardController from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchema from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.get("/cards/balance/:cardId", cardController.getCardStatement);

cardRouter.post("/cards/new/:employeeId", validateSchema(cardSchema.typeSchema), cardController.addNewCard);

cardRouter.patch("/cards/activate/:cardId", validateSchema(cardSchema.activateSchema), cardController.activateCard);
cardRouter.patch("/cards/block/:cardId", validateSchema(cardSchema.blockSchema), cardController.blockCard);
cardRouter.patch("/cards/unblock/:cardId", validateSchema(cardSchema.blockSchema), cardController.unblockCard);

export default cardRouter;