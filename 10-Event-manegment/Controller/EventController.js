import fs from "fs";

import HttpError from "../middleware/httpError.js";

import Event from "../model/EventModel.js";

const create = async (req, res, next) => {
  try {
    const { EventName, Date, EventVenue, EventDescription, ticketPrice } =
      req.body;

    const EventImages = req.files?.EventImages?.map((file) => file.path) || [];

    const EventPoster = req.files?.EventPoster?.map((file) => file.path) || [];

    const EventBanner = req.files?.EventBanner?.[0]?.path || null;

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

const getAllEvent = async (req, res, next) => {
  try {
    const EventData = await Event.find({});

    if (!EventData) {
      return next(new HttpError("no EventData found", 404));
    }

    res.status(200).json({
      success: true,
      total: EventData.length,
      message: "Event data",
      EventData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getEvent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const EventData = await Event.findById(id);

    if (!EventData) {
      return next(new HttpError("no EventData found with this id", 404));
    }
    res.status(200).json({
      success: true,
      message: "Event data found successfully",
      EventData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteEvent = await Event.findById(id);

    if (!deleteEvent) {
      return next(new HttpError("Event not found", 404));
    }

    if (deleteEvent.EventImages && deleteEvent.EventImages.length > 0) {
      deleteEvent.EventImages.forEach((file) => {
        fs.unlinkSync(file);
      });
    }

    if (deleteEvent.EventPoster && deleteEvent.EventPoster.length > 0) {
      deleteEvent.EventPoster.forEach((file) => {
        fs.unlinkSync(file);
      });
    }

    if (deleteEvent.EventBanner) {
      fs.unlinkSync(deleteEvent.EventBanner);
    }

    if (deleteEvent.EventSpeaker && deleteEvent.EventSpeaker.length > 0) {
      deleteEvent.EventSpeaker.forEach((file) => {
        fs.unlinkSync(file);
      });
    }

    if (deleteEvent.EventDocuments && deleteEvent.EventDocuments.length > 0) {
      deleteEvent.EventDocuments.forEach((file) => {
        fs.unlinkSync(file);
      });
    }

    await Event.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const UpdateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return next(new HttpError("no event found with this id", 404));
    }

    const updates = Object.keys(req.body || {});

    const allowedFields = [
      "EventName",
      "Date",
      "EventDescription",
      "EventVenue",
      "ticketPrice",
    ];

    const isValidUpdates = updates.every((field) => {
      return allowedFields.includes(field);
    });

    if (!isValidUpdates) {
      return next(new HttpError("invalid update field", 400));
    }

    if (req.files?.EventImages) {
      event.EventImages?.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.EventImages = req.files.EventImages.map((file) => file.path);
    }

    // EventPoster
    if (req.files?.EventPoster) {
      event.EventPoster?.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.EventPoster = req.files.EventPoster.map((file) => file.path);
    }

    updates.forEach((field) => {
      event[field] = req.body[field];
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { create, getAllEvent, getEvent, deleteEvent, UpdateEvent };
