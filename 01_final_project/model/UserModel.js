import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          throw new Error("password can not set as a password");
        }
      },
    },
    Role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    Address: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    Profile_Pic: {
      type: String,
    },
    Cloudinary_Id: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
  try {
    const user = this;

    if (user.isModified("Password")) {
      user.Password = await bcrypt.hash(user.Password, 10);
    }
  } catch (error) {
    next(error);
  }
});

// find user for login

userSchema.statics.findByCredential = async function (Email, Password) {
  try {
    const users = await this.findOne({ Email });

    if (!users) {
      throw new Error("unbale to login");
    }

    const isMatch = await bcrypt.compare(Password, users.Password);

    if (!isMatch) {
      throw new Error("unbale to login");
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
      process.env.JWt_SECRET,
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

const Usermodel = mongoose.model("Usermodel", userSchema);

export default Usermodel;
