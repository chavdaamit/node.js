import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, Email, password, role, Address, phone, isVerified } =
      req.body;

    const newUser = await modelUser({
      name,
      Email,
      password,
      role,
      Address,
      phone,
      isVerified,
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

export default { add, GetAllUser };
