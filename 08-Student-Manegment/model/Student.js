// import mongoose from "mongoose";

// const studentschema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   grId: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   course: {
//     type: String,
//     enum: ["fullstack", "graphic design", "ul/ux design", "video editing"],
//     required: true,
//   },
//   isActive: {
//     type: String,
//     enum: ["active", "pending", "hold", "suspend"],
//     default: "active",
//   },
//   mobailNumber: {
//     type: Number,
//     min: 10,
//     required: true,
//   },
// });

// const student = mongoose.model(studentschema);

import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grid: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    enum: ["fullstack", "ui/ux design", "graphic design", "video editing"],
    required: true,
  },
  isActive: {
    type: String,
    enum: ["active", "pending", "hold", "suspend"],
    default: "active",
  },
  mobailNumber: {
    type: Number,
    min: 10,
    required: true,
  },
});

const student = mongoose.model(studentschema);
