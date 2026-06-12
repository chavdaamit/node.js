import express, { Router } from "express";
import HttpError from "./middleware/HttpError.js";
import router from "./router/userRouter.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/user", router);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("requsted routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.StatusCode || 500)
    .json({ message: error.message || "internal Error" });
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("faild to connectDb", 500);
    }

    app.listen(port, (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`server running on from ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
