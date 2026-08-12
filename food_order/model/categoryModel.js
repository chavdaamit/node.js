import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Gujarati",
      "Chinese",
      "South Indian",
      "Punjabi",
      "Pizza",
      "Burger",
      "Italian",
      "Dessert",
      "Drinks",
    ],
  },

  description: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  Cloudinary_id: {
    type: String,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
