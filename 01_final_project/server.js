import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import router from "./router/UserRouter.js";
import BlogRouter from "./router/BlogRouter.js";

import adminRouter from "./router/adminRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", router);

app.use("/blog", BlogRouter);

app.use("/admin", adminRouter);

app.use;

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "internal server error",
  });
});

const port = 4000;

async function startServer() {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("faild to connectDb", 500);
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
