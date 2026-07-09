import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      enum: ["customer", "provider", "admin"],
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
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

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

const modelUser = mongoose.model("user", userSchema);

export default modelUser;
