import mongoose from "mongoose";

async function coonectDB() {
  try {
    const coonect = await mongoose.connect(process.env.MONGO_URI);

    console.log("Db connected");
    return coonect;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default coonectDB;
