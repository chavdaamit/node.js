import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../middleware/HttpError.js";

const userSchema = await mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          throw new Error("password can not set as a password");
        }
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    Address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
// hash Password
userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
// find user for login
userSchema.statics.findByCredentials = async function (Email, password) {
  try {
    const users = await this.findOne({ Email });

    if (!users) {
      throw new Error("unable to login");
    }

    const isMatch = await bcrypt.compare(password, users.password);

    if (!isMatch) {
      throw new Error("unable to login");
    }
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Generate Auth Token

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    if (!token) {
      throw new Error("faild to generate auth token");
    }

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObjet = user.toObject();

  // delete userObjet.password;

  delete userObjet._id;

  delete userObjet.createdAt;

  delete userObjet.updatedAt;

  delete userObjet.__v;

  return userObjet;
};

const modelUser = mongoose.model("user", userSchema);

export default modelUser;
