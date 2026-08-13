import Joi from "joi";
export const addCategorySchema = Joi.object({
  name: Joi.string()
    .valid(
      "Gujarati",
      "Chinese",
      "South Indian",
      "Punjabi",
      "Pizza",
      "Burger",
      "Italian",
      "Dessert",
      "Drinks",
    )
    .required()
    .messages({
      "string.base": "Category name must be in string format",
      "any.only": "Please select a valid category",
      "any.required": "Category name is required",
    }),

  description: Joi.string().min(5).max(500).trim().required().messages({
    "string.base": "Description must be in string format",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description must not exceed 500 characters",
    "any.required": "Description is required",
  }),
});

export const updateCategorySchema = addCategorySchema
  .fork(["name", "description"], (fields) => fields.optional())
  .or("name", "description")
  .messages({
    "object.missing": "mname and description  any one required to update ",
  });
