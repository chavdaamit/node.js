import Package from "../model/Packages.js";

import HttpError from "../middleware/HttpError.js";

import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const {
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
    } = req.body;

    // console.log(
    //   packageName,
    //   price,
    //   startDate,
    //   endDate,
    //   duration,
    //   destination,
    //   packageType,
    // );

    if (
      !packageName ||
      !price ||
      !startDate ||
      !endDate ||
      !duration ||
      !destination ||
      !packageType
    ) {
      return next(new HttpError("all the fields are required"));
    }

    const packageImage = req.file.path;

    // console.log("pakage image", packageImage);

    const newPackage = new Package({
      packageName,
      startDate,
      endDate,
      price,
      duration,
      destination,
      packageType,
      packageImage: req.file.path,
      cloudinary_id: req.file.filename,
    });

    await newPackage.save();

    res
      .status(201)
      .json({ success: true, message: "new pakage added", newPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllPackage = async (req, res, next) => {
  try {
    const packageData = await Package.find({});

    if (!packageData) {
      return next(new HttpError("package data not available", 404));
    }

    res.status(200).json({
      success: true,
      total: packageData.length,
      message: "package data",
      packageData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packageData = await Package.findById(id);

    if (!packageData) {
      return next(new HttpError("package data not available", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package data", packageData });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findById(id);

    if (!deletedPackage) {
      return next(new HttpError("package not found", 404));
    }

    console.log("Deleted Package:", deletedPackage);

    if (deletedPackage.cloudinary_id) {
      await cloudinary.uploader.destroy(deletedPackage.cloudinary_id);
    }

    await Package.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "package deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, getAllPackage, getById, deletePackage };
