import jwt from "jsonwebtoken";

import HttpError from "./HttpError.js";

import UserModel from "../model/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return next(new HttpError("auth header is required", 404));
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpError("Authentication faild", 404));
    }

    req.user = user;

    req.token = token;

    next();
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default auth;
