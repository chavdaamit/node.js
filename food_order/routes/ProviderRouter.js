import express from "express";

import providerController from "../controller/providerController.js";

const router = express.Router();

router.post("/add", providerController.addProvider);

router.get("/AllProvider", providerController.allprovider);

export default router;
