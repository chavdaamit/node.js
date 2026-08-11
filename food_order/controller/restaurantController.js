import restaurantModel from "../model/restaurant.js";

import HttpError from "../middleware/HttpError.js";

import cloudinary from "../config/cloudinary.js";

import sendEmail from "../utils/sendEmail.js";

import { getWelcomeEmailTemplate } from "../template/emailTemplate.js";

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

    await sendEmail({
      to: req.user.Email,
      subject: "Restaurant Added Successfully - Food_order🏨",
      html: getWelcomeEmailTemplate(newRestaurant.restaurantname, "restaurant"),
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

const deleteRestaurant = async (req, res, next) => {
  try {
    const targetedUser = req.params.id;

    const Restaurant = await restaurantModel.findById(targetedUser);

    if (!Restaurant) {
      return next(new HttpError("Restaurant not found", 404));
    }

    if (Restaurant.Cloudinary_Id) {
      await cloudinary.uploader.destroy(Restaurant.Cloudinary_Id);
    }

    await Restaurant.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Restaurant data delete successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);

    if (!restaurant) {
      return next(new HttpError("Restaurant not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "restaurantname",
      "descripition",
      "address",
      "State",
      "city",
      "phone",
      "openingTime",
      "ClosingTime",
      "isOpen",
    ];

    const isValidUpdate = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdate) {
      return next(new HttpError("Only allowed fields can be updated", 400));
    }

    if (req.file) {
      if (restaurant.Cloudinary_id) {
        await cloudinary.uploader.destroy(restaurant.Cloudinary_id);
      }

      restaurant.restaurantImage = req.file.path;
      restaurant.Cloudinary_id = req.file.filename;
    }

    updates.forEach((field) => {
      restaurant[field] = req.body[field];
    });

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, GetAllRestaurant, deleteRestaurant, updateRestaurant };
