import UserModel from "../model/UserModel.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, Email, password, phoneNumber } = req.body;

    const newUser = await UserModel({
      name,
      Email,
      password,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "new user added", newUser });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const GetAllUser = async (req, res, next) => {
  try {
    const user = await UserModel.find({});

    if (!user) {
      return next(new HttpError("user data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "all User Data Successfully",
      total: user.length,
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const User = await UserModel.findByCredentials(Email, password);

    if (!User) {
      return next(new HttpError("unbale to login", 401));
    }

    const token = await User.generateAuthToken();

    res
      .status(200)
      .json({ success: true, message: "user login successfully", User, token });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const authLogin = async (req, res, next) => {
  const user = req.user;

  // console.log(user);

  res
    .status(200)
    .json({ success: true, message: "auth login successfully", user });
};

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    user.tokens = user.tokens.filter((t) => t.token != req.token);

    await user.save();

    res.status(200).json({ success: true, message: "user logout succesfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({
      success: true,
      message: "user logout from all  device successfully ",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const Delete = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const updateUSer = async (req, res, next) => {
  try {
    const user = req.user;

    const updates = Object.keys(req.body);

    let allowedFiled = ["name", "Address", "phone"];

    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("Only allowed fields can update", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User data updated successfully",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default {
  add,
  GetAllUser,
  login,
  authLogin,
  logout,
  Delete,
  logOutAll,
  updateUSer,
};
