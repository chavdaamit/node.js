import restaurantModel from "../model/restaurant.js";

import HttpError from "../middleware/HttpError.js";

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

    res
      .status(201)
      .json({
        success: true,
        message: "new restaurant successfully",
        newRestaurant,
      });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

export default { add };
