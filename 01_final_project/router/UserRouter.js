import express from "express";
import userController from "../Controller/userController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import upload from "../middleware/upload.js";
import { registerSchema } from "../validation/UserSchema.js";

const router = express.Router();

router.post(
  "/add",
  validate(registerSchema),
  upload.single("Profile_Pic"),
  userController.add,
);

router.post("/login", userController.login);

router.post("/authLogin", auth, userController.authLogin);

router.get("/logoutUser", auth, userController.logout);

router.get("/AllLogout", auth, userController.logoutAll);

router.get("/allUser", auth, checkRole("admin"), userController.getAllUser);

router.delete("/deleteUser", auth, userController.deleteUser);

router.patch(
  "/update",
  auth,
  upload.single("Profile_Pic"),
  userController.updateUser,
);

export default router;
