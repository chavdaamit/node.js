import express from "express";

import FoodController from "../controller/FoodController.js";

import { foodImage } from "../middleware/uploads.js";

import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

import validate from "../middleware/validate.js";

import { addFoodSchema, updateFoodSchema } from "../validation/foodSchema.js";

const router = express.Router();

router.post(
  "/AddFood",
  auth,
  CheckRole("admin", "provider"),
  foodImage.array("food_pic", 5),
  validate(addFoodSchema),
  FoodController.addFood,
);

router.get("/AllFood", auth, FoodController.GetAllFood);

router.delete(
  "/DeleteFood/:id",
  auth,
  CheckRole("admin", "provider"),
  FoodController.deleteFood,
);

router.patch(
  "/UpdateFood/:id",
  auth,
  CheckRole("admin", "provider"),
  foodImage.array("food_pic", 5),
  validate(updateFoodSchema),
  FoodController.updateFood,
);

export default router;
