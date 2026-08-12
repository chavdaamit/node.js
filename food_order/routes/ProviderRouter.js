import express from "express";

import auth from "../middleware/auth.js";

import { document } from "../middleware/uploads.js";

import validate from "../middleware/validate.js";

import providerController from "../controller/providerController.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  document.single("document", 3),
  providerController.addProvider,
);

router.get("/AllProvider", providerController.allprovider);

router.delete("/DeleteProvider/:id", auth, providerController.deleteProvider);

router.patch("/UpdateProvider/:id", auth, providerController.updateProvider);

export default router;
