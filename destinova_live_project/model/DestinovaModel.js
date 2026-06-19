import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    StartData: {
      type: Date,
      required: true,
    },
    EndData: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    packageImage: {
      type: [String],
    },
    packageType: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Packages = mongoose.model("packages", packageSchema);

export default Packages;