import express from "express";
// controllers

import UserController from "../controller/UserController.js";

// validation

import validate from "../middleware/validate.js";

import userSchema from "../validation/UserSchema.js";
import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

const router = express.Router();

// routes
router.post("/add", validate(userSchema), UserController.add);

router.get("/AllUser", auth, CheckRole("admin"), UserController.GetAllUser);

router.post("/userLogin", UserController.login);

router.post("/authLogin", auth, UserController.authLogin);

router.get("/LogOut", auth, UserController.logout);

router.get("/AllLogout", auth, UserController.logOutAll);

router.delete("/DeleteUSer", auth, UserController.Delete);

router.patch("/updateUser", auth, UserController.updateUSer);

export default router;
