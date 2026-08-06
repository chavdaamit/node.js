import express from "express";

import auth from "../middleware/auth.js";

import uploads from "../middleware/uploads.js";

import validate from "../middleware/validate.js";

import providerController from "../controller/providerController.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  uploads.single("document"),
  providerController.addProvider,
);

router.get("/AllProvider", providerController.allprovider);

export default router;
