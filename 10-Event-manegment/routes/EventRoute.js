import express from "express";

import upload from "../middleware/upload.js";

import EventController from "../Controller/EventController.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "EventImages", maxCount: 10 },

    { name: "EventPoster", maxCount: 1 },

    { name: "EventBanner", maxCount: 5 },

    { name: "EventSpeaker", maxCount: 5 },

    { name: "EventDocuments", maxCount: 5 },
  ]),
  EventController.create,
);

router.patch(
  "/:id",
  upload.fields([
    { name: "EventImages", maxCount: 10 },
    { name: "EventPoster", maxCount: 1 },
    { name: "EventBanner", maxCount: 5 },
    { name: "EventSpeaker", maxCount: 5 },
    { name: "EventDocuments", maxCount: 5 },
  ]),
  EventController.UpdateEvent,
);

router.get("/AllEvent", EventController.getAllEvent);

router.get("/:id", EventController.getEvent);

router.delete("/:id", EventController.deleteEvent);

router.patch("/:id", EventController.UpdateEvent);
export default router;
