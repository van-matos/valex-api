import joi, { ObjectSchema } from "joi";

export const addPaymentSchema: ObjectSchema = joi.object({
  cardId: joi.number().required(),
  cardPassword: joi.string().required(),
  amount: joi.number().min(0).required(),
});