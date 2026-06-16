import jwt from "jsonwebtoken";

// import HttpError from "./HttpError";

import User from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const auth = async function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return next(new HttpError("auth header is required", 401));
    }

    const token = authHeader.replace("Bearer", "").trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpError("Authentication failed", 401));
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new HttpError("please authentication", 401));
  }
};

export default auth;

// const auth = async function (req, res, next) {
//   try {
//     const authHeader = req.header("Authorization");

//     if (!authHeader) {
//       return next(new HttpError("auth header is required", 401));
//     }

//     const token = authHeader.replace("bearer", "").trim();
//   } catch (error) {}
// };
