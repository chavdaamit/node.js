import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurantname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    description: {
      type: String,
      required: true,
    },
    preparingTime: {
      type: String,
      min: 1,
      max: 30,
      required: true,
    },
    food_pic: [
      {
        type: String,
        required: true,
      },
    ],
    Cloudinary_id: [
      {
        type: String,
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required: true,
    },
  },

  {
    timestamps: true,
  },
);

const foodmodel = mongoose.model("food", foodSchema);

export default foodmodel;
