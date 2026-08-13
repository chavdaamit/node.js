import Joi from "joi";

export const addFoodSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required().messages({
    "string.base": "Food name must be in string format",
    "string.min": "Food name must be at least 2 characters long",
    "string.max": "Food name must not exceed 50 characters",
    "any.required": "Food name is required",
  }),

  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  Owner: Joi.string().hex().length(24).required().messages({
    "string.base": "Owner Id must be in string format",
    "string.hex": "Invalid Owner Id",
    "string.length": "Owner Id must be 24 characters",
    "any.required": "Owner is required",
  }),

  restaurantname: Joi.string().hex().length(24).required().messages({
    "string.base": "Restaurant Id must be in string format",
    "string.hex": "Invalid Restaurant Id",
    "string.length": "Restaurant Id must be 24 characters",
    "any.required": "Restaurant is required",
  }),

  description: Joi.string().min(5).max(500).trim().required().messages({
    "string.base": "Description must be in string format",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description must not exceed 500 characters",
    "any.required": "Description is required",
  }),

  preparingTime: Joi.number().positive().required().messages({
    "number.base": "Preparing Time must be a number",
    "number.positive": "Preparing Time must be greater than 0",
    "any.required": "Preparing Time is required",
  }),

  category: Joi.string().hex().length(24).required().messages({
    "string.base": "Category Id must be in string format",
    "string.hex": "Invalid Category Id",
    "string.length": "Category Id must be 24 characters",
    "any.required": "Category is required",
  }),

  food_pic: Joi.any().optional(),
});

export const updateFoodSchema = addFoodSchema
  .fork(
    [
      "name",
      "price",
      "Owner",
      "restaurantname",
      "description",
      "preparingTime",
      "category",
    ],
    (field) => field.optional(),
  )
  .or(
    "name",
    "price",
    "Owner",
    "restaurantname",
    "description",
    "preparingTime",
    "category",
    "isAvailable",
    "isVerified",
    "food_pic",
  )
  .messages({
    "object.missing": "At least one food field is required to update",
  });
