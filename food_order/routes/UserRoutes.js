import express from "express";

import UserController from "../controller/UserController.js";

const router = express.Router();

router.post("/add", UserController.add);

router.get("/AllUser", UserController.GetAllUser);

export default router;
