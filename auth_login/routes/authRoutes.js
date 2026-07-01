import express from "express";
import passport from "../config/passport.js";
import user from "../model/User.js";
import HttpError from "../middleware/HttpError.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

// router.get(
//   "/google/login",
//   passport.authenticate("google", { scope: [["email"], ["profile"]] }),
// );

router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.send("this is callback url");
//   },
// );

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.redirect("/profile");
  },
);

router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.user });
});

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(new HttpError("faild to logout"));
    }
  });
  res.redirect("/");
});

export default router;
