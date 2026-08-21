import express from "express";

import auth from "../middleware/auth.js";

import CheckRole from "../middleware/checkRole.js";

import validate from "../middleware/validate.js";

import orderController from "../controller/orderController.js";

const router = express.Router();

router.post("/add", auth, orderController.addOrder);

export default router;
