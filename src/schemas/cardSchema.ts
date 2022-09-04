import joi, { ObjectSchema} from "joi";

export const activateSchema: ObjectSchema = joi.object({
    securityCode: joi.string()
        .trim()
        .required()
        .pattern(/^[0-9]{3}$/),
    password: joi.string()
        .trim()
        .required(),
});

export const blockSchema = joi.object({
    password: joi.string().required(),
});

export const typeSchema: ObjectSchema = joi.object({
    type: joi.string()
        .valid(
            "groceries",
            "restaurant",
            "transport",
            "education",
            "health")
        .required()
});