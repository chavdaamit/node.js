import modelUSer from "../model/userModel.js";

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
      .json({ success: true, message: "new User added successfully", newUser });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await modelUSer.find();

    if (!users) {
      return next(new HttpError("not user data found ", 400));
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

const AuthLogin = async function (req, res, next) {
  try {
    const Users = req.user;

    if (!users) {
      return next(new httpError("unable to login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new httpError(error.message));
  }
};

export default { add, getAllUsers, login };
