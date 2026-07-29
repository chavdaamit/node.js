import express from "express";

import BlogController from "../Controller/BlogController.js";

import auth from "../middleware/auth.js";

import upload from "../middleware/upload.js";

import checkRole from "../middleware/checkRole.js";

import validate from "../middleware/validate.js";

import { addBlogSchema, updateBlogSchema } from "../validation/BlogSchema.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  upload.single("BlogImg"),
  validate(addBlogSchema),
  BlogController.blogAdd,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("user", "admin"),
  BlogController.deleteBlog,
);

router.patch(
  "/update/:id",
  auth,
  upload.single("BlogImg"),
  validate(updateBlogSchema),
  BlogController.updateBlog,
);

router.get(
  "/allBlog",
  auth,
  checkRole("user", "admin"),
  BlogController.getAllBlogs,
);

export default router;
