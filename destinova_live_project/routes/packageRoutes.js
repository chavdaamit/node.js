import express from "express";

import upload from "../middleware/upload.js";

import DestinovaController from "../controller/DestinovaController.js";

const router = express.Router();

router.post("/add", upload.single("packageImage"), DestinovaController.add);

router.get("/allPackages", DestinovaController.getAllPackages);

router.get("/:id", DestinovaController.packageById);

router.delete("/:id", DestinovaController.deletePackage);

router.patch(
  "/:id",
  upload.single("packageImage"),
  DestinovaController.updatePackageDetail,
);

export default router;
