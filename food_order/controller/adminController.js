import modelUser from "../model/UserModel.js";

import HttpError from "../middleware/HttpError.js";

const getAllUsers = async (req, res) => {
  try {
    const { role, isVerified } = req.query;

    const Query = {};

    if (role === "provider") {
      Query.role = role;
    }

    if (role === "customer") {
      Query.role = role;
    }

    if (isVerified != undefined) {
      Query.isVerified = isVerified === "true";
    }

    const users = await modelUser.find(Query);

    if (users.length === 0) {
      return next(new HttpError("user data not  found", 404));
    }

    const totalUser = await modelUser.countDocuments(Query);

    res
      .status(200)
      .json({ success: true, message: "user data found", totalUser, users });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

export default { getAllUsers };
