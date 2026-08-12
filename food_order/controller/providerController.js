import HttpError from "../middleware/HttpError.js";
import providerModel from "../model/Provider.js";
import modelUser from "../model/UserModel.js";
import sendEmail from "../utils/sendEmail.js";

import { getWelcomeEmailTemplate } from "../template/emailTemplate.js";

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

    await sendEmail({
      to: user.Email,
      subject: "Welcome to Food_Order - provider Account 👨‍🍳",
      html: getWelcomeEmailTemplate(user.name, "provider"),
    });

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

const updateProvider = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { restaurantname, bankNumber } = req.body;

    const provider = await providerModel.findById(id);

    if (!provider) {
      return next(new HttpError("provider not found", 404));
    }

    if (!restaurantname) {
      provider.restaurantName = restaurantname;
    }

    if (!bankNumber) {
      provider.bankNumber = bankNumber;
    }

    if (req.files && req.files.length > 0) {
      provider.document = req.files.map((file) => file.path);
      provider.Cloudinary_Id = req.files.map((file) => file.filename);
    }

    await provider.save();

    const updateProvider = await providerModel
      .findById(id)
      .populate("providerName", "name Email");

    res.status(200).json({
      success: true,
      message: "provider update successfully",
      provider: updateProvider,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const deleteProvider = async (req, res, next) => {
  try {
    const { id } = req.params;

    const provider = providerModel.find(id);

    if (!provider) {
      return next(new HttpError("provider  not found", 404));
    }

    await providerModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "provider delete succssfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { addProvider, allprovider, deleteProvider, updateProvider };
