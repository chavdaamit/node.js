import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("hello from server");
});

// undefined routes

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

// centralize error

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new httpError(error.message));
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

async function StartServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server runninng on from port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

StartServer();
