import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDb from "./config/db.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello from serevr" });
});
1;

app.use(express.json());

app.use((req, res, next) => {
  return next(new HttpError("request rotes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new error());
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server Error" });
});

const port = 5000;

async function satrtServer() {
  try {
    const connect = await connectDb;

    if (!connect) {
      throw new Error("connectDb faild");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

satrtServer();
