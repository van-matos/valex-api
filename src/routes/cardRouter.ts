import { Router } from "express";

import * as cardController from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import * as cardSchema from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.get("/balance/:cardId", cardController.getCardStatement);

cardRouter.post("/cards/:employeeId", validateSchema(cardSchema.typeSchema), cardController.addNewCard);

cardRouter.patch("/activate/:cardId", validateSchema(cardSchema.activateSchema), cardController.activateCard);
cardRouter.patch("/block/:cardId", validateSchema(cardSchema.blockSchema), cardController.blockCard);
cardRouter.patch("/unblock/:cardId", validateSchema(cardSchema.blockSchema), cardController.unblockCard);

export default cardRouter;