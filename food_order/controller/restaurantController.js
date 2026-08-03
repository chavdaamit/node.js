import restaurantModel from "../model/restaurant.js";

import HttpError from "../middleware/HttpError.js";
import { options } from "joi";

const add = async (req, res, next) => {
  try {
    const {
      restaurantname,
      descripition,
      address,
      State,
      city,
      phone,
      openingTime,
      ClosingTime,
      isOpen,
    } = req.body;

    const newRestaurant = await restaurantModel.create({
      restaurantname,
      descripition,
      address,
      State,
      city,
      phone,
      openingTime,
      ClosingTime,
      isOpen,
      restaurantImage: req.file?.path || null,
      Cloudinary_id: req.file?.filename || null,
      Owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "new restaurant successfully",
      newRestaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

const GetAllRestaurant = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      isOpen,
      search,
      city,
      sort = "createAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.restaurantname = {
        $regex: search,
        $options: "1",
      };
    }

    if (city) {
      filter.city = city;
    }

    if (isOpen !== undefined) {
      filter.isOpen = isOpen === "true";
    }

    const totalRestaurant = await restaurantModel.countDocuments(filter);

    const restaurants = await restaurantModel
      .find(filter)
      .populate("Owner", "name Email Address -_id")
      .lean();

    if (restaurants.length === 0) {
      res.status(404).json({ success: true, message: "restaurant noot found" });
    }

    res.status(200).json({
      success: true,
      message: "restaurant data found",
      totalRestaurant: totalRestaurant,
      page: page,
      restaurants,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, GetAllRestaurant };
