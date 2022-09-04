import joi from "joi";

export const typeValidation = joi.object({
    type: joi.string()
        .valid(
            "groceries",
            "restaurant",
            "transport",
            "education",
            "health")
        .required()
})