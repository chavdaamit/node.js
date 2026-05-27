import express from "express";
import HttpError from "./middleware/httpError.js";
import connectDb from "./config/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError("serever routus not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new HttpError(error.message));
  }

  res
    .status(error.Statuscode || 500)
    .json({ success: true, message: error.message || "internal error" });
});

const port = 5000;

async function server() {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("faild to connectdb");
    }

    app.listen(port, (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

server();
