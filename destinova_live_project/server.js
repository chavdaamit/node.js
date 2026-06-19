import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import HttpError from "./middleware/HttpError.js";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import Packages from "./model/DestinovaModel.js";

import router from "./routes/packageRoutes.js";

const app = express();

app.use(express.json());

app.use("/package", router);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.Statuscode || 500)
    .json({ success: true, message: error.message || "internal Error server" });
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      return console.log("faild To connectDB");
    }
    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server runnig on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
