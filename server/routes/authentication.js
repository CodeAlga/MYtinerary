const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("../passport");
const auth = require("../../middleware/auth");

//
// ----- USER AUTHENTICATION
//

router.post("/", (req, res) => {
  const { email, password } = req.body;

  //
  // ----- VALIDATION

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter required fields" });
  }

  //
  // ------ LOOK IF USER EXISTS BY EMAIL

  userModel.findOne({ "auth.local.email": req.body.email }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "That email is not registered" });

    //
    // --- VALIDATE PASSWORD
    bcrypt.compare(
      req.body.password,
      user.auth.local.password,
      (err, result) => {
        if (result == false) {
          return res.status(400).send({ msg: "Invalid credentals" });
        } else {
          //
          // --- IF ALL CORRECT GENERATE JWT

          const payload = { id: user.id };
          const options = { expiresIn: 2592000 };
          jwt.sign(
            payload,
            process.env.DB_JWT_SECRET,
            options,
            async (err, token) => {
              if (err) throw err;
              await res.json({
                //
                // WHAT WE GET BACK
                token,
                user: {
                  id: user.id,
                  userName: user.userName,
                  email: user.email
                }
              });
            }
          );
        }
      }
    );
  });
});

//
// ------ LOOK IF THERE IS TOKEN AND LOAD USER DATA
//

router.get("/user", auth, (req, res) => {
  userModel
    .findById(req.user.id)
    .select("-password") // not grab the password
    .then((user) => res.json(user));
});

// //
// // ------- PASSPORT AUTHENTICATION WITH JWT
// //

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     userModel
//       .findOne({ _id: req.user.id })
//       .then((user) => {
//         res.json(user);
//       })
//       .catch((err) => res.status(404).json({ error: "User does not exist!" }));
//   }
// );

// //
// // ------- GOOGLE AUTHENTICATION
// //

// router.get(
//   "/login/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/login/google/authentication",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   function(req, res) {
//     console.log("req.body " + req.user);
//     //console.log(token);
//     let token = req.user;
//     res.redirect(
//       "http://localhost:3000/login/google/autentication/?token=" + token
//     );
//   }
// );

module.exports = router;
