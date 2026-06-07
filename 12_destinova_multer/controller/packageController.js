import Package from "../model/Packages.js";

import HttpError from "../middleware/HttpError.js";

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

    console.log(
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
    );

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

    console.log("pakage image", packageImage);

    const newPackage = new Package({
      packageName,
      startDate,
      endDate,
      price,
      duration,
      destination,
      packageType,
      packageImage: req.file.path,
    });

    await newPackage.save();

    res
      .status(201)
      .json({ success: true, message: "new pakage added", newPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add };
