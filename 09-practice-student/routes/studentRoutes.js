import express from "express";

import studentController from "../controller/stuedentController.js";

const router = express.Router();

router.post("/add", studentController);
