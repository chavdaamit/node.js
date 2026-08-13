import categoryModel from "../model/categoryModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = new categoryModel({
      name,
      description,
      categoryImage: req.file?.path,
      Cloudinary_id: req.file?.filename,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "New category added successfully",
      newCategory,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return next(new HttpError("Category not found", 404));
    }

    if (category.Cloudinary_id) {
      await cloudinary.uploader.destroy(category.Cloudinary_id);
    }

    await categoryModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoryUpdate = await categoryModel.findById(id);

    if (!categoryUpdate) {
      return next(new HttpError("Category data not found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "description"];

    const isValidUpdates = updates.every((field) =>
      allowedUpdates.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("Only allowed fields can be updated", 400));
    }

    updates.forEach((update) => {
      categoryUpdate[update] = req.body[update];
    });

    if (req.file) {
      if (categoryUpdate.Cloudinary_id) {
        await cloudinary.uploader.destroy(categoryUpdate.Cloudinary_id);
      }

      categoryUpdate.categoryImage = req.file.path;
      categoryUpdate.Cloudinary_id = req.file.filename;
    }

    await categoryUpdate.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: categoryUpdate,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const totalCategory = await categoryModel.countDocuments(filter);

    const categories = await categoryModel
      .find(filter)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category data found",
      totalCategory,
      page: Number(page),
      categories,
      totalPages: Math.ceil(totalCategory / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategory,
};
