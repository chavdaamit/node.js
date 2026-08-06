import HttpError from "../middleware/HttpError.js";
import providerModel from "../model/Provider.js";
import modelUser from "../model/UserModel.js";

const addProvider = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await modelUser.findById(userId);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const existingProvider = await providerModel.findOne({
      providerName: userId,
    });

    if (existingProvider) {
      return next(
        new HttpError("already provider registered with this id", 400),
      );
    }

    const { restaurantName, bankNumber } = req.body;

    const newProvider = await providerModel.create({
      providerName: userId,
      restaurantName,
      bankNumber,
      document: req.file?.path || null,
      Cloudinary_Id: req.file?.filename || null,
    });

    user.role = "provider";

    await user.save();

    const provider = await providerModel
      .findById(newProvider._id)
      .populate("providerName")
      .populate("restaurantName");

    res.status(201).json({
      success: true,
      message: "new provider added",
      provider,
    });
  } catch (error) {
    next(error);
  }
};

const allprovider = async (req, res, next) => {
  try {
    const providers = await providerModel
      .find()
      .populate("providerName")
      .populate("restaurantName");

    if (providers.length === 0) {
      return next(new HttpError("provider data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "all provider data successfully",
      total: providers.length,
      providers,
    });
  } catch (error) {
    next(error);
  }
};

export default { addProvider, allprovider };
