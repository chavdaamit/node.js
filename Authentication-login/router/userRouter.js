import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);
router.get("/AllUser", userController.getAllUsers);
router.post("/Login", userController.login);

router.get("/AuthLogin", auth, userController.AuthLogin);

router.delete("/UserDelete", auth, userController.UserDelete);

router.patch("/updateUser", auth, userController.UserUpdate);

router.post("/logOutUser", auth, userController.logOutUser);

router.patch("/LogOutAll", auth, userController.logOutAll);

export default router;
