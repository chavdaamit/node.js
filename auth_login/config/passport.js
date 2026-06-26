import passport from "passport";

import googlePassport from "passport-google-oauth20";

import dotenv from "dotenv";

import user from "../model/User.js";
dotenv.config({ path: "./.env" });

const googleStrategy = googlePassport.Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const alreadyUser = await user.findOne({ googleId: profile.id });
        console.log("profile", profile);

        if (!alreadyUser) {
          const newUser = await user.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0]?.value,
          });

          done(null, newUser);
        }
        done(null, alreadyUser);
      } catch (error) {
        console.log(error.message);
      }
    },
  ),
);

export default passport;
