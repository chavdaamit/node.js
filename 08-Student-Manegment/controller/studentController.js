// import httpError from "../middleware/httpError.js";
// import Student from "../model/Student.js";

// const add = async (req, res, next) => {
//   try {
//     const { name, grid, course, email, isActive, mobileNumber } = req.body;

//     const newStudent = await new Student({
//       name,
//       grid,
//       course,
//       isActive,
//       mobileNumber,
//       email,
//     });

//     await newStudent.save();

//     res.status(201).json({
//       success: true,
//       message: "student data added successfully",
//       newStudent,
//     });
//   } catch (error) {
//     next(new httpError(error.message));
//   }
// };

import httpError from "../middleware/httpError.js";
import Student from "../model/Student.js";

const add = async (req, res, next) => {
  try {
    const { name, grid, email, course, isActive, mobileNumber } = req.body;

    const newStudent = await new Student({
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
      message: "Student data added successfully",
      newStudent,
    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const getAllStudentData = async (req, res, next) => {
  try {
    const student = await Student.find({});

    if (student.length <= 0) {
      res.status(200).json({ success: true, message: "no student data found" });
    }

    res.status(200).json({
      success: true,
      total: Student.length,
      message: "student data fetched successfully",
      student,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const studentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentData = await Student.findById(id);

    if (!studentData) {
      return next(new httpError("student not found with this id", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "student found", studentData });
  } catch (error) {
    next(new httpError("invalid  student id", 400));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentData = await Student.findByIdAndDelete(id);

    if (!studentData) {
      return next(new httpError("student not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "student data delete successfully" });
  } catch (error) {
    next(new HttpError("invalid student id", 400));
  }
};

export default { add, getAllStudentData, deleteById, studentById };
