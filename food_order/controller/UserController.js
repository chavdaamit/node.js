import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";

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
    const user = req.user;

    await user.deleteOne();

    res.status(200).json({ success: true, message: "user data successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default { add, GetAllUser, login, authLogin, logout, logOutAll, Delete };
