import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      trim: true,
      required: true,
    },
    packageType: {
      type: String,
    },
    packageImage: {
      type: String,
    },
  },
  {
    timeStamp: true,
  },
);

const Package = mongoose.model("package", packageSchema);

export default Package;
