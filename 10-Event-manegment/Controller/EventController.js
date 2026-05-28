import fs from "fs";

import HttpError from "../middleware/httpError.js";

import Event from "../model/EventModel.js";

const create = async (req, res, next) => {
  try {
    const { EventName, Date, EventVenue, EventDescription, ticketPrice } =
      req.body;

    const EventImages = req.files?.EventImages?.map((file) => file.path) || [];

    const EventPoster = req.files?.EventPoster?.map((file) => file.path) || [];

    const EventBanner = req.files?.EventBanner?.[0]?.path || "";

    const EventSpeaker =
      req.files?.EventSpeaker?.map((file) => file.path) || [];

    const EventDocuments =
      req.files?.EventDocuments?.map((file) => file.path) || [];

    const newEvent = await new Event({
      EventName,
      Date,
      EventVenue,
      EventDescription,
      ticketPrice,  
      EventPoster,
      EventBanner,
      EventSpeaker,
      EventDocuments,
      EventImages,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ success: true, message: "Event Added Successfully", newEvent });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default create;
