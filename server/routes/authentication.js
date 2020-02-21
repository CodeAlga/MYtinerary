const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("../passport");
//
// ----- USER AUTHENTICATION
//

router.post("/login", (req, res) => {
  userModel
    .findOne({
      "auth.local.email": req.body.email
    })
    .then((user) => {
      if (!user) {
        return res.status(402).json({ msg: "We couldn't find that email!" });
      } else {
        bcrypt.compare(
          req.body.password,
          user.auth.local.password,
          (err, result) => {
            if (result == true) {
              console.log("Im logged in");
              const payload = { id: user.id };

              const options = { expiresIn: 2592000 };
              jwt.sign(
                payload,
                process.env.DB_JWT_SECRET,
                options,
                (err, token) => {
                  if (err) {
                    res.json({
                      success: false,
                      token: "There was an error loggin you in"
                    });
                  } else {
                    console.log(token);
                    res.send({
                      success: true,
                      token: token
                    });
                  }
                }
              );
            } else {
              return res.status(402).json({ msg: "Wrong password!" });
            }
          }
        );
      }
    });
});

// //
// // ------- PASSPORT AUTHENTICATION WITH JWT
// //

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json({ error: "User does not exist!" }));
  }
);

// //
// // ------- GOOGLE AUTHENTICATION
// //

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/authentication",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function(req, res) {
    console.log("req.body " + req.user);
    //console.log(token);
    let token = req.user;
    res.redirect(
      "http://localhost:3000/login/google/autentication/?token=" + token
    );
  }
);

module.exports = router;
