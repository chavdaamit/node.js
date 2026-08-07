import express from "express";
// controllers

import UserController from "../controller/UserController.js";

// validation

import validate from "../middleware/validate.js";

import { userSchema } from "../validation/UserSchema.js";
import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";
import { profilepic } from "../middleware/uploads.js";

import { updateUSerSchema } from "../validation/UserSchema.js";

const router = express.Router();

// routes
router.post(
  "/add",
  validate(userSchema),
  profilepic.single("profilepic"),
  UserController.add,
);

router.get("/AllUser", auth, CheckRole("admin"), UserController.GetAllUser);

router.post("/userLogin", UserController.login);

router.post("/authLogin", auth, UserController.authLogin);

router.get("/LogOut", auth, UserController.logout);

router.get("/AllLogout", auth, UserController.logOutAll);

router.delete("/DeleteUSer", auth, UserController.Delete);

router.patch(
  "/updateUser",
  auth,
  profilepic.single("profilepic"),
  validate(updateUSerSchema),
  UserController.updateUSer,
);

export default router;
