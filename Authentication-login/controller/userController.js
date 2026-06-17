import modelUSer from "../model/userModel.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    console.log("ADD USER BODY:", req.body);
    const { name, Email, password } = req.body;

    const newUser = new modelUSer({
      name,
      Email,
      password,
    });
    await newUser.save();

    console.log("NEW USER CREATED:", newUser);
    res
      .status(201)
      .json({ success: true, message: "new User added successfully", newUser });
  } catch (error) {
    console.log("ADD ERROR:", error);
    next(new HttpError(error.message, 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await modelUSer.find();

    console.log("USERS:", users);
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
    console.log("GET ALL ERROR:", error);
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    console.log("LOGIN BODY:", req.body);
    const { Email, password } = req.body;

    const Users = await modelUSer.findByCredentials(Email, password);

    console.log("User Found", users);

    const token = await Users.generateAuthToken();
    console.log("tokens GENERATED", token);

    if (!Users) {
      return next(new HttpError("unable to login"));
    }

    res.status(200).json({ success: true, Users });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    next(new HttpError(error.message, 500));
  }
};

const AuthLogin = async (req, res, next) => {
  try {
    console.log("auth User", req.user);

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

const UserDelete = async (req, res, next) => {
  try {
    console.log("DELETE USER ID:", req.user._id);
    const UserId = req.user._id;

    const user = await modelUSer.findByIdAndDelete(UserId);
    console.log("DELETED USER:", user);

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

const UserUpdate = async (req, res, next) => {
  try {
    console.log("UPDATE BODY:", req.body);
    const user = req.user;
    console.log("USER BEFORE UPDATE:", user);
    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);
    console.log("UPDATES:", updates);
    const allowedUpdates = ["name", "password"];

    const isValidUpdate = updates.every((fields) =>
      allowedUpdates.includes(fields),
    );
    console.log("IS VALID UPDATE:", isValidUpdate);
    if (!isValidUpdate) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((UserUpdate) => {
      return (user[UserUpdate] = req.body[UserUpdate]);
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user data successfully", user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutUser = async (req, res, next) => {
  try {
    console.log("LOGOUT TOKEN:", req.token);
    console.log("TOKENS BEFORE:", req.user.tokens);
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    await req.user.save();
    console.log("TOKENS AFTER:", req.user.tokens);

    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    console.log("LOGOUT ALL USER:", req.user._id);
    console.log("TOKENS BEFORE:", req.user.tokens);

    req.user.tokens = [];

    req.user.save();

    console.log("TOKENS AFTER:", req.user.tokens);

    req.status(200).json({
      success: true,
      message: "user logout from all device successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllUsers,
  login,
  AuthLogin,
  UserDelete,
  UserUpdate,
  logOutUser,
  logOutAll,
};
