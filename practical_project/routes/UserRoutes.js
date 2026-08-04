import express from "express";

import UserController from "../controller/UserController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", UserController.add);

router.get("/AllUser", UserController.GetAllUser);

router.post("/Login", UserController.login);

router.post("/AuthLogin", auth, UserController.authLogin);

router.post("/LogOut", auth, UserController.logout);

router.post("/LogoutAll", auth, UserController.logOutAll);

router.delete("/DeleteUser", auth, UserController.Delete);

router.patch("/Update", auth, UserController.updateUSer);

export default router;
