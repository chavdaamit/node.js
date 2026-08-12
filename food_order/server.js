// third party or external module
import express from "express";

// local modules

import HttpError from "./middleware/HttpError.js";
import connectDb from "./config/db.js";

// routes
import router from "./routes/UserRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import restaurantRoutes from "./routes/restaurantRoutes.js";

import providerRoutes from "./routes/ProviderRouter.js";

import FoodRoutes from "./routes/FoodRoutes.js";

import modelUser from "./model/UserModel.js";
import restaurantModel from "./model/restaurant.js";

import dotenv from "dotenv";
// dotenv config
dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

// routes
app.use("/user", router);
// admin routes
app.use("/admin", adminRoutes);
// restaurant Routes
app.use("/restaurant", restaurantRoutes);

// provider routes

app.use("/provider", providerRoutes);

// Food routes

app.use("/Food", FoodRoutes);

// server check
app.get("/", (req, res) => {
  res.json({ message: "hello from serevr" });
});
// if route not found
app.use((req, res, next) => {
  return next(new HttpError("request rotes not found", 404));
});

// centralize error handling
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

satrtServer();

// async function checowner() {
//   try {
//     // const owner = await modelUser.findById("6a60b65d8b617e428c1d19fa");

//     // console.log(owner);

//     const restaurant = await restaurantModel
//       .findById("6a60b65d8b617e428c1d19fa")
//       .populate("Owner", "name Email phone -_id");
//     console.log(restaurant.Owner);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// checowner();
