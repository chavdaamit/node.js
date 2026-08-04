import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    providerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurantName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    bankNambar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const providerModel = mongoose.model("provider", providerSchema);

export default providerModel;
