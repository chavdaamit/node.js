import foodmodel from "../model/foodModel.js";

import HttpError from "../middleware/HttpError.js";

import cloudinary from "../config/cloudinary.js";


const addFood = async (req, res, next) => {
  try {
    const {
      name,
      price,
      Owner,
      restaurantname,
      description,
      preparingTime,
      category,
    } = req.body;

    const newFood = new foodmodel({
      name,
      price,
      Owner,
      restaurantname,
      description,
      preparingTime,
      category,
      food_pic: req.files?.map((file) => file.path) || [],
      Cloudinary_id: req.files?.map((file) => file.filename) || [],
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "new food successfully added",
      newFood,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const GetAllFood = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      restaurantname,
      isAvailable,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "1",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (restaurantname) {
      filter.restaurantname = restaurantname;
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    const totalFood = await foodmodel.countDocuments(filter);

    const foods = await foodmodel
      .find(filter)
      .populate("category")
      .populate("Owner", "name Email")
      .populate("restaurantname")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (foods.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "food not  found" });
    }

    res.status(200).json({
      success: true,
      message: "Food data dound",
      totalFood,
      page: Number(page),
      foods,
      totalPages: Math.ceil(totalFood / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await foodmodel.findById(id);

    if (!food) {
      return next(new HttpError("Food not found", 404));
    }

    if (food.Cloudinary_id?.length > 0) {
      for (const imageId of food.Cloudinary_id) {
        await cloudinary.uploader.destroy(imageId);
      }
    }

    await foodmodel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foodUpdate = await foodmodel.findById(id);

    if (!foodUpdate) {
      return next(new HttpError("Food data not found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "name",
      "price",
      "Owner",
      "restaurantname",
      "description",
      "preparingTime",
      "category",
      "isAvailable",
      "isVerified",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedUpdates.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed fields can be updated", 400));
    }

    updates.forEach((update) => {
      foodUpdate[update] = req.body[update];
    });

    if (req.file) {
      if (foodUpdate.Cloudinary_id) {
        for (const imageId of foodUpdate.Cloudinary_id) {
          await cloudinary.uploader.destroy(imageId);
        }
      }

      foodUpdate.food_pic = req.files.map((file) => file.path);

      foodUpdate.Cloudinary_id = req.files.map((file) => file.filename);
    }

    await foodUpdate.save();

    res.status(201).json({
      success: true,
      message: "food update successfully",
      data: foodUpdate,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { addFood, GetAllFood, deleteFood, updateFood };
