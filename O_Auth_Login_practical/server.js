import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import profileRotes from "./routes/profileRoutes.js";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";

dotenv.config({ path: "./.env" });

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
app.use("/profile", profileRotes);
app.use((req, res, next) => {
  return next(new HttpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = 5000;

async function startserver() {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error("Db faild");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server runnig port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

startserver();
