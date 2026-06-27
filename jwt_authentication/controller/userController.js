import modelUSer from "../model/Modeluser.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, Email, password } = req.body;

    const newUser = new modelUSer({
      name,
      Email,
      password,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "new user added successfully", newUser });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await modelUSer.find();

    if (!users) {
      return next(new HttpError("not user found", 404));
    }

    res.status(200).json({
      success: true,
      total: users.length,
      message: "user data found",
      users,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const Users = await modelUSer.findByCredentials(Email, password);

    const token = await Users.generateAuthToken();

    if (!Users) {
      return next(new HttpError("unable to login"));
    }

    res.status(200).json({ success: true, Users });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const AuthLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("unable to login", 401));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutUser = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    req.user.save();

    req.status(200).json({
      success: true,
      message: "user logout from all device successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const UserDelete = async (req, res, next) => {
  try {
    // const UserId = req.user._id;
    const { id } = req.params;

    const user = await modelUSer.findByIdAndDelete(id);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "User delete successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllUser,
  UserDelete,
  login,
  AuthLogin,
  logOutUser,
  logOutAll,
};
