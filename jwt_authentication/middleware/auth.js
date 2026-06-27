import jwt from "jsonwebtoken";
import modelUSer from "../model/Modeluser.js";
import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return next(new HttpError("Authorization header required", 401));
    }

    const token = authHeader.replace("Bearer", "").trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await modelUSer.findOne({
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
    return next(new HttpError(error.message, 401));
  }
};

export default auth;
