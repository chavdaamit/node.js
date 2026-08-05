import HttpError from "../middleware/HttpError.js";
import providerModel from "../model/Provider.js";

const addProvider = async (req, res, next) => {
  try {
    const { providerName, restaurantName, document, bankNambar } = req.body;

    const newProvider = await providerModel.create({
      providerName,
      restaurantName,
      document,
      bankNambar,
    });

    res.status(201).json({
      sucesss: true,
      message: "provider added successfully",
      newProvider,
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

    if (!providers) {
      return next(new HttpError("provider data not found", 404));
    }

    res.status(200).json({
      sucesss: true,
      message: "all provider data successfully",
      total: providers.length,
      providers,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { addProvider, allprovider };

