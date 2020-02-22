//const express = require("express");
//const router = express.Router();
const LocalStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const passport = require("passport");
require("dotenv").config();
var googleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");

passport.serializeUser(function(user, done) {
  done(null, user);
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.DB_JWT_SECRET;

module.exports = passport.use(
  new LocalStrategy(opts, (jwt_payload, done) => {
    console.log("on passport");
    console.log(opts);
    console.log(jwt_payload);

    userModel
      .findById(jwt_payload.id)
      .then((user) => {
        console.log("on passport 2");
        console.log(user);

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

// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.GOOGLE_SECRET_ID,
//       clientSecret: process.env.GOOGLE_SECRET_CLIENT,
//       callbackURL:
//         "http://localhost:5000/users-social/login/google/authentication"
//     },
//     function(accessToken, refreshToken, profile, done, req, res) {
//       //const token = accessToken;
//       const newUser = new userModel({
//         "auth.social.id": profile.id,
//         "auth.social.email": profile.emails[0].value,
//         "auth.social.fname": profile.name.givenName,
//         "auth.social.lname": profile.name.familyName,
//         "auth.social.userName": profile.displayName,
//         "auth.social.profileImg": profile.photos[0].value
//       });

//       //
//       // POST SOCIAL USER TO DB
//       //

//       userModel
//         .findOne({
//           "auth.social.email": profile.emails[0].value
//         })
//         .then((user) => {
//           if (!user) {
//             console.log("user not found");
//             newUser
//               .save()
//               .then((user) => {
//                 const payload = { id: user.id };
//                 const options = { expiresIn: 2592000 };
//                 jwt.sign(
//                   payload,
//                   process.env.DB_JWT_SECRET,
//                   options,
//                   (err, token) => {
//                     if (err) {
//                       res.json({
//                         success: false,
//                         token: "There was an error loggin you in"
//                       });
//                     } else {
//                       console.log(token);
//                       done(null, token);
//                     }
//                   }
//                 );
//               })
//               .catch((err) => console.log(err));

//             //
//             // LOG USER IF EXISTS
//             //
//           } else {
//             console.log("user found");
//             const payload = { id: user.id };
//             console.log(payload);
//             const options = { expiresIn: 2592000 };
//             const token = jwt.sign(payload, process.env.DB_JWT_SECRET, options);
//             //console.log(token);
//             done(null, token);
//           }
//         })
//         .catch((error) => {
//           done(null, error);
//         });
//     }
//   )
// );
