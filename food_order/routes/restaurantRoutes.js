import express from "express";

import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

import restaurantController from "../controller/restaurantController.js";
import uploads from "../middleware/uploads.js";
import validate from "../middleware/validate.js";
import restaurantSchema from "../validation/restaurant.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  CheckRole("admin", "provider"),
  uploads.single("restaurantImage"),
  validate(restaurantSchema),
  restaurantController.add,
);

export default router;
