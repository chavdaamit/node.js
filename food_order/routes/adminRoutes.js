import express from "express";

import UserController from "../controller/UserController.js";

import validate from "../middleware/validate.js";

import CheckRole from "../middleware/checkRole.js";

import auth from "../middleware/auth.js";

import { profilepic } from "../middleware/uploads.js";

import { updateUSerSchema } from "../validation/UserSchema.js";

const router = express.Router();

router.delete(
  "/DeleteUSer/:id",
  auth,
  CheckRole("admin"),
  validate(updateUSerSchema),
  UserController.Delete,
);

router.patch(
  "/updateUser/:id",
  auth,
  CheckRole("admin"),
  profilepic.single("profilepic"),
  validate(updateUSerSchema),
  UserController.updateUSer,
);

export default router;
