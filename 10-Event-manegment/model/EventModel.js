import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    EventName: {
      type: String,
      required: true,
      trim: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    EventVenue: {
      type: String,
      required: true,
      trim: true,
    },
    EventDescription: {
      type: String,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    EventPoster: {
      type: [String],
      required: true,
    },
    EventBanner: {
      type: String,
      required: true,
    },
    EventSpeaker: {
      type: [String],
      required: true,
    },
    EventDocuments: {
      type: [String],
      required: true,
    },
    EventImages: {
      type: [String],
    },
  },

  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
