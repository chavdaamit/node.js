import express from "express";

import categoryController from "../controller/categoryController.js";

import { categoryImage } from "../middleware/uploads.js";

import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

import validate from "../middleware/validate.js";

import {
  addCategorySchema,
  updateCategorySchema,
} from "../validation/categorySchema.js";

const router = express.Router();

router.post(
  "/addCategory",
  auth,
  categoryImage.single("categoryImage"),
  CheckRole("admin"),
  validate(addCategorySchema),
  categoryController.addCategory,
);

router.get(
  "/allCategory",
  auth,
  CheckRole("admin"),
  categoryController.getAllCategory,
);

router.delete(
  "/deleteCategory/:id",
  auth,
  CheckRole("admin"),
  categoryController.deleteCategory,
);

router.patch(
  "/updateCategory/:id",
  auth,
  CheckRole("admin"),
  categoryImage.single("categoryImage"),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

export default router;
