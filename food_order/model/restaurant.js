import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantname: {
      type: String,
      required: true,
    },
    descripition: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    ClosingTime: {
      type: String,
      required: true,
    },

    isOpen: {
      type: Boolean,
      required: true,
    },
    restaurantImage: {
      type: String,
      required: true,
    },
    Cloudinary_id: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
