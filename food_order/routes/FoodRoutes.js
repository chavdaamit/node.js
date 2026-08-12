import express from "express";

import FoodController from "../controller/FoodController.js";

import { foodImage } from "../middleware/uploads.js";

import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

const router = express.Router();

router.post(
  "/AddFood",
  auth,
  CheckRole("admin", "provider"),
  foodImage.array("food_pic", 5),
  FoodController.addFood,
);

router.get("/AllFood", auth, FoodController.GetAllFood);

router.delete(
  "/DeleteFood/:id",
  auth,
  CheckRole("admin", "provider"),
  FoodController.deleteFood,
);

export default router;
