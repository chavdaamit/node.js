import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/UserRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/user", router);

app.use("/", (req, res) => {
  res.send("hello from server");
});

app.use((req, res, next) => {
  return next(new HttpError("request rotes not found", 404));
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDb();

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

startServer();
