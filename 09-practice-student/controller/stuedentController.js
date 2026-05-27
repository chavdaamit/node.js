import HttpError from "../middleware/httpError.js";

import student from "../model/studentM.js";

const add = async (req, res, next) => {
  try {
    const { name, grid, email, course, isActive, mobileNumber } = req.body;

    const newStudent = await new student({
      name,
      grid,
      email,
      course,
      isActive,
      mobileNumber,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "student data added successfully",
      newStudent,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};
