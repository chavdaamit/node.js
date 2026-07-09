import express from "express";
// controllers

import UserController from "../controller/UserController.js";

// validation

import validate from "../middleware/validate.js";

import userSchema from "../validation/UserSchema.js";

const router = express.Router();

// routes
router.post("/add", validate(userSchema), UserController.add);

router.get("/AllUser", UserController.GetAllUser);

export default router;
