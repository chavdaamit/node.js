import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);
router.get("/allUser", userController.getAllUser);
router.delete("/:id", userController.UserDelete);

router.post("/Login", userController.login);

router.get("/authLogin", auth, userController.AuthLogin);

router.post("/logOutUser", auth, userController.logOutUser);
router.get("/logOutAllUser", auth, userController.logOutAll);

export default router;
