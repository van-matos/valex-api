import joi, { ObjectSchema } from "joi";

export const addRechargeSchema: ObjectSchema = joi.object({
  amount: joi.number().min(0).required(),
});