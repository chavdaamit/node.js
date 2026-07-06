import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log("db connected");
    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDb;
