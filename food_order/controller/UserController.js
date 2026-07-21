import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const { name, Email, password, role, Address, phone } = req.body;

    const newUser = await modelUser({
      name,
      Email,
      password,
      role,
      Address,
      phone,
      profilepic: req.file?.path || null,
      cloudinary_id: req.file?.filename || null,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "new user added", newUser });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const GetAllUser = async (req, res, next) => {
  try {
    const user = await modelUser.find({});

    if (!user) {
      return next(new HttpError("user data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "All User Data Successfully",
      total: user.length,
      user,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const User = await modelUser.findByCredentials(Email, password);

    if (!User) {
      return next(new HttpError("unable to login", 401));
    }

    const token = await User.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      User,
      token,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  const user = req.user;

  console.log(user);

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
// all user logoutall
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

// delete user

const Delete = async (req, res, next) => {
  try {
    const targetUser = req.params.id || req.user._id;

    const user = await modelUser.findById(targetUser);

    await user.deleteOne();

    res.status(200).json({ success: true, message: "user data successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// update user

const updateUSer = async (req, res, next) => {
  try {
    const targetUser = req.params.id || req.user._id;

    const user = await modelUser.findById(targetUser);

    const updates = Object.keys(req.body);

    let allowedFiled = ["name", "Address", "phone"];

    if (req.user.role === "admin") {
      allowedFiled = [...allowedFiled, "isVerified"];
    }

    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("only allowed  filed can update", 404));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user data updated successfuly", user });
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
  logOutAll,
  Delete,
  updateUSer,
};
