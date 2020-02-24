//const express = require("express");
//const router = express.Router();
const LocalStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const passport = require("passport");
require("dotenv").config();
var googleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
//import { clearErrors } from "../client/src/store/actions/errorActions";

passport.serializeUser(function(user, done) {
  done(null, user);
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.DB_JWT_SECRET;

module.exports = passport.use(
  new LocalStrategy(opts, (jwt_payload, done) => {
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
      callbackURL: "http://localhost:5000/authentication/social/google-callback"
    },
    function(accessToken, refreshToken, profile, done, req, res) {
      //const token = accessToken;
      const newUser = new userModel({
        "auth.social.id": profile.id,
        "auth.social.email": profile.emails[0].value,
        "auth.social.fname": profile.name.givenName,
        "auth.social.lname": profile.name.familyName,
        "auth.social.userName": profile.displayName,
        "auth.social.profileImg": profile.photos[0].value
      });

      //
      // POST SOCIAL USER TO DB
      //

      userModel
        .findOne({
          "auth.social.email": profile.emails[0].value
        })
        .then((user) => {
          if (!user) {
            newUser
              .save()
              .then(async (user) => {
                const payload = { id: user.id };
                const options = { expiresIn: 2592000 };
                await jwt.sign(
                  payload,
                  process.env.DB_JWT_SECRET,
                  options,
                  (err, token) => {
                    if (err) throw err;

                    res.json({
                      //
                      // WHAT WE GET BACK
                      token,
                      user: {
                        id: user.id,
                        userName: user.auth.social.userName,
                        email: user.auth.social.email,
                        profileImg: user.auth.socia.profileImg
                      }
                    });
                  }
                );

                // .catch((err) => console.log(err));
                // await jwt.sign(
                //   payload, // payload we want to add to the token - better the ID then other sensitives informations https://jwt.io/
                //   process.env.JWT_SECRET, // taking the keys from default.json
                //   options, // 1 hour
                //   (err, token) => {
                //     if (err) throw err;
                //     res.json({
                //       // our response that will showed in our state under auth
                //       token: token,
                //       user: {
                //         provider: "google",
                //         id: user.id,
                //         userName: user.auth.social.userName,
                //         email: user.auth.social.email,
                //         profileImg: user.auth.socia.profileImg
                //       }
                //     });
                //   }
                // );

                done(null, user);
              })
              .catch((err) => {
                done(err, null);
              });

            //
            // LOGIN USER IF EXISTS
            //
          } else {
            console.log("user found");
            const payload = { id: user.id };

            const options = { expiresIn: 2592000 };
            const token = jwt.sign(payload, process.env.DB_JWT_SECRET, options);

            done(null, token);
          }
        })
        .catch((error) => {
          done(null, error);
        });
    }
  )
);
