import Joi from "joi";

const restaurantSchema = Joi.object({
  restaurantname: Joi.string().min(1).max(30).required().messages({
    "string.base": "name is must be in string",
    "string.min": "name is minimum 1 Charachter is long",
    "string.max": "name is minimum 30 charachter is long",
    "any.required": "name is required",
  }),
  descripition: Joi.string().min(2).max(20).required().messages({
    "string.base": "descripition is must be in string",
    "string.min": "descripition is minimum 2 charachter is long",
    "string.max": "descripition is minimum 20 charachter is long",
    "any.required": "descripition is required",
  }),
  address: Joi.string().min(2).max(40).required().messages({
    "string.base": "address is must be in string",
    "string.min": "address is minimum 2 charachter is long",
    "string.max": "address is minimum 40 charachter is long",
    "any.required": "adress is required",
  }),
  State: Joi.string().min(2).max(14).required().messages({
    "string.base": "state is must be in string",
    "string.min": "state is minimum 2 charchter is long",
    "string.max": "state is minimum 14 charchter is long",
    "any.required": "state is required",
  }),
  city: Joi.string().min(2).max(20).required().messages({
    "string.base": "city is must be in string",
    "string.min": "city is minimum 2 chachter is  long",
    "string.max": "city is mimum 20 chachter is long",
    "any.required": "city is required",
  }),
  phone: Joi
    .string()
    .min(10)
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "phone is minimum 10 digit",
      "any.required": "phome is required",
    }),

  openingTime: Joi
    .string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "openingTime must be in hh:mm format",
      "any.required": "openingTime is required",
    }),
  ClosingTime: Joi
    .string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "closingTime must be in hh:mm format",
      "any.required": "closingTime is  required",
    }),
  isOpen: Joi.boolean().required().messages({
    "boolean.base": "isOpen is must be in boolean",
    "any.required": "isOpen is required",
  }),
});

export default restaurantSchema;
