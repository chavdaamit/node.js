import Joi from "joi";

export const updateProviderSchema = Joi.object({
  restaurantName: Joi.string().max(25).messages({
    "string.max": "restaurant in must be 25 characters",
  }),

  bankNumber: Joi.string()
    .pattern(/^\d{9,18}$/)
    .messages({
      "string.pattern.base": "Bank Number must contain 9 to 18 digits only",
    }),

  document: Joi.any().optional(),
})

  .or("restaurantName", "bankNumber", "document")
  .messages({
    "object.missing": "restaurantName, bankNumber or document is required",
  });
