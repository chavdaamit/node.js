import HttpError from "./HttpError.js";

const CheckRole =
  (...Roles) =>
  (req, res, next) => {
    try {
      if (!req.user) {
        return next(new HttpError("please Authenticate", 400));
      }

      if (!Roles.includes(req.user.role)) {
        return next(new HttpError("forbidden access denied", 403));
      }
      next();
    } catch (error) {
      next(new HttpError(error.message));
    }
  };

export default CheckRole;


