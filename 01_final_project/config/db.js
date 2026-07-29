import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log("DB connected");
    return connect;
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDb;
