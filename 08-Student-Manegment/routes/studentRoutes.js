import express from "express";

import studentController from "../controller/studentController.js";

const router = express.Router();

router.post("/add", studentController.add);

router.get("/getAllStudents", studentController.getAllStudentData);

router.delete("/:id", studentController.deleteById);

router.get("/:id", studentController.studentById);
export default router;
