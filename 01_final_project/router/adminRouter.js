import express from "express";

import userController from "../Controller/userController.js";

import { registerSchema } from "../validation/UserSchema.js";

import validate from "../middleware/validate.js";

import auth from "../middleware/auth.js";

import checkRole from "../middleware/checkRole.js";

import upload from "../middleware/upload.js";

import { updateBlogSchema } from "../validation/blogSchema.js";

const router = express.Router();

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  userController.deleteUser,
);

router.patch(
  "/update/:id",
  auth,
  checkRole("admin"),
  upload.single("Profile_Pic"),
  userController.updateUser,
);

export default router;
