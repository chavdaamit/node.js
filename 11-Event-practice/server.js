import express from "express";
import dotenv from "dotenv";
import HttpError from "./middleware/HttpError.js";
import coonectDB from "./config/db.js";

import eventRoutes from "./routes/eventRoutes.js";
dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use("/events", eventRoutes);
app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError(" request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

async function startserver() {
  try {
    const connect = await coonectDB();

    if (!connect) {
      throw new Error("faild to connectDb");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startserver();
