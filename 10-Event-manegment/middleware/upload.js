import multer from "multer";

import path from "path";

import HttpError from "./httpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {

    const EventBanner   

  },
});
