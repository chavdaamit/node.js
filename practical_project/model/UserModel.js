import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import HttpError from "../middleware/HttpError.js";

const UserSchema = new mongoose.Schema(
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
    },
    phoneNumber: {
      type: String,
      required: true,
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
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

UserSchema.statics.findByCredentials = async function (Email, password) {
  try {
    const users = await this.findOne({ Email });

    if (!users) {
      throw new Error("unbale to login");
    }

    const isMatch = await bcrypt.compare(password, users.password);

    if (!isMatch) {
      throw new Error("Unbale to login");
    }
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

UserSchema.methods.generateAuthToken = async function () {
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

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
