import express from "express";
import HttpError from "./middleware/HttpError.js";
import authRoutes from "./routes/authRoutes.js";
import connectDb from "./config/db.js";
import passport from "./config/passport.js";

import session from "express-session";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
// dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/auth", authRoutes);
app.use((req, res, next) => {
  return next(new HttpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new error());
  }

  res
    .status(error.StatusCode || 500)
    .json({ message: error.message || "internal  server error" });
});

const port = 5000;

async function StartServer() {
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

StartServer();
