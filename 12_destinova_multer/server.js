import express from "express";
import dotenv from "dotenv";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/packageRoutes.js";

const app = express();

app.use(express.json());

app.use("/package", router);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("requst routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(500).json({ message: error.message || "internal server error" });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      return console.log("faild to connectDB");
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
startServer();
