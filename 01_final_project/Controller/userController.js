import HttpError from "../middleware/HttpError.js";
import Usermodel from "../model/UserModel.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const { Name, Email, Password, Role, Address, Phone } = req.body;

    const newUser = await Usermodel({
      Name,
      Email,
      Password,
      Role,
      Address,
      Phone,
      Profile_Pic: req.file?.path,
      Cloudinary_Id: req.file.filename,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "new user added", newUser });
  } catch (error) {
    console.log(error);

    next(new HttpError(error.message, 500));
  }
};

// login user

const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    const user = await Usermodel.findByCredential(Email, Password);

    if (!user) {
      return next(new HttpError("unbale to login"));
    }
    const token = await user.generateAuthToken();

    res
      .status(200)
      .json({ success: true, message: "user login successfully", user, token });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// auth login
const authLogin = async (req, res, next) => {
  const user = req.user;

  res
    .status(200)
    .json({ success: true, message: "auth login successfully", user });
};

// logout

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    user.tokens = user.tokens.filter((t) => t.token != req.token);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// logout from all dives

const logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({
      success: true,
      message: "user logout from all device succssfully",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// // get all user

const getAllUser = async (req, res, next) => {
  try {
    const user = await Usermodel.find({});

    if (user.length === 0) {
      return next(new HttpError("User data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "All user data",
      Total: user.length,
      user,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// delete user

const deleteUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await Usermodel.findById(targetedUser);

    await cloudinary.uploader.destroy(user.Cloudinary_Id);

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "user data delete successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

// update user
const updateUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await Usermodel.findById(targetedUser);

    const updates = Object.keys(req.body);

    let allowedFiled = ["Name", "Address", "Phone"];

    if (req.user.Role === "admin") {
      allowedFiled = [...allowedFiled, "isVerified"];
    }

    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("only allowed filed can update", 404));
    }

    if (req.file) {
      if (user.Cloudinary_Id) {
        await cloudinary.uploader.destroy(user.Cloudinary_Id);
      }

      user.Profile_Pic = req.file.path;

      user.Cloudinary_Id = req.file.filename;
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({
      message: "user data updated successfully",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default {
  add,
  login,
  authLogin,
  logout,
  logoutAll,
  getAllUser,
  deleteUser,
  updateUser,
};
