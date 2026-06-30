import express from "express";
import passport from "../config/passport.js";
import user from "../model/User.js";

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
  }),
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("this is callback url");
  },
);

router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.user });
});

export default router;
