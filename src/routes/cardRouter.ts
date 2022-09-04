import { Router } from "express";

import { addNewCard } from "../controllers/cardController";
import { validateSchema } from "../middlewares/validateSchema";
import { typeValidation } from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post('/create-card/:id', validateSchema(typeValidation), addNewCard);

export default cardRouter;