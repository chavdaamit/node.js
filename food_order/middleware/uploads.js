import multer from "multer";
import cloudinary from "../config/cloudinary.js";

import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "food_order",
//     allowed_formats: ["jpeg", "jpg", "png", "webp"],
//     transformation: [
//       {
//         height: 800,
//         width: 800,
//         crop: "limit",
//       },
//       {
//         fetch_format: "webp",
//       },
//       {
//         quality: "auto",
//       }, Restaurant mayo export
//     ],
//   },
// });

// const uploads = multer({
//   storage,
//   limits: {
//     fileSize: 20 * 1024 * 1024,
//   },
// });

const createUploads = ({
  folder,
  transformation = [],
  resource_type = "auto",
  fileSize = 1024 * 1024 * 5,
  allowed_formats = [],
  mimeType = [],
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder,
        transformation,
        allowed_formats,
        resource_type,
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize },
    fileFilter: (req, file, cb) => {
      if (mimeType.length && !mimeType.includes(file.mimetype)) {
        return cb(
          new Error(`invalid file type,Allowed types: ${mimeType.join(", ")}`),
          false,
        );
      } else {
        cb(null, true);
      }
    },
  });
};

export const profilepic = createUploads({
  folder: "food_order/profilepic",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],

  allowed_formats: ["jpeg", "png", "jpg", "webp"],
  mimeType: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

export const restaurantImage = createUploads({
  folder: "food_order/restaurantImage",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],

  allowed_formats: ["jpeg", "png", "jpg", "webp"],
  mimeType: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
});

export const document = createUploads({
  folder: "food_order/document",
  resource_type: "raw",
  allowed_formats: "pdf",
  mimeType: ["application/pdf"],
});


