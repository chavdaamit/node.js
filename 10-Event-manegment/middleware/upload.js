import multer from "multer";

import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "uploads/";

    if (file.fieldname === "EventImages") {
      folderName += "EventImages";
    } else if (file.fieldname === "EventPoster") {
      folderName += "EventPoster";
    } else if (file.fieldname === "EventBanner") {
      folderName += "EventBanner";
    } else if (file.fieldname === "EventSpeaker") {
      folderName += "EventSpeaker";
    } else if (file.fieldname === "EventDocuments") {
      folderName += "EventDocuments";
    } else {
      folderName += "others";
    }

    fs.mkdirSync(folderName, { recursive: true });
    cb(null, folderName);
  },

  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileType = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];

  if (allowedFileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png and pdf files are allowed", 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;
