import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);
router.get("/AllUser", userController.getAllUsers);
router.post("/Login", userController.login);

router.get("/AuthLogin", auth, userController.AuthLogin);

export default router;
