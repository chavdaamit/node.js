import mongoose, { Types } from "mongoose";

const newBlog = new mongoose.Schema({
  BlogTitle: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    enum: ["Technology", "Sports", "Politics"],
    required: true,
  },
  BlogImg: {
    type: String,
  },
  Cloudinary_Id: {
    type: String,
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usermodel",
  },
});

const BlogSchema = mongoose.model("blog", newBlog);

export default BlogSchema;
