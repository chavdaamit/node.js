import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().min(2).max(30).trim().required().messages({
    "string.base": "name must be in string format",
    "string.min": "name must be  at least 2 charcater long",
    "string.max": "name must be 30 charcater long",
    "any.required": "name is required",
  }),
  Email: joi.string().email().required().messages({
    "string.base": "Email must be in string format",
    "any.required": "Email is required",
  }),
  password: joi.string().min(6).max(20).required().messages({
    "string.base": "password must be in string format",
    "string.base": "password must be at least 6 charcater long",
    "string.max": "password must be 20 charcater long",
    "any.required": "password is required",
  }),
  role: joi.string().valid("customer", "provider", "admin").default("customer"),

  phone: joi
    .string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "phone number must be string",
      "string.pattern.base":
        "phone number must be a valid 10-digit indian mobile number",
      "any.required": "phone number is required",
    }),
  Address: joi.string().min(5).max(100).required(),
});

export const updateUSerSchema = userSchema
  .fork(["name", "Address", "phone", "password"], (fields) => fields.optional())
  .fork(["role", "Email"], (fields) => fields.forbidden())
  .or("name", "Address", "phone", "password")
  .messages({
    "object.missing":
      "name,Address,phone and password any one required to update",
  });
