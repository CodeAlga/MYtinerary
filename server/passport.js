//const express = require("express");
//const router = express.Router();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const passport = require("passport");
require("dotenv").config();
var googleStrategy = require("passport-google-oauth20");

passport.serializeUser(function(user, done) {
  done(null, user);
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.DB_JWT_SECRET;

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    userModel
      .findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);

// //
// // ------ GOOGLE STRATEGY
// // https://medium.com/@melikalbasi/how-to-implement-passport-with-google-in-your-mern-stack-app-8c2171717d86
// //

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_SECRET_ID,
      clientSecret: process.env.GOOGLE_SECRET_CLIENT,
      callbackURL:
        "http://localhost:5000/users-social/login/google/authentication"
    },
    function(accessToken, refreshToken, profile, done) {
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);
