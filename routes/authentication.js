const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("../passport");
const auth = require("../middleware/auth");

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
    bcrypt
      .compare(req.body.password, user.auth.local.password)
      .then((failed) => {
        if (!failed) {
          return res.status(400).send({ msg: "Invalid credentals" });
        }

        //
        // --- IF ALL CORRECT GENERATE JWT
        const payload = { id: user.id };
        const options = { expiresIn: 2592000 };

        jwt.sign(payload, process.env.DB_JWT_SECRET, options, (err, token) => {
          if (err) throw err;

          res.json({
            //
            // WHAT WE GET BACK
            token,
            user: {
              id: user.id,
              fname: user.auth.local.fname,
              lname: user.auth.local.lname,
              userName: user.auth.local.userName,
              email: user.auth.local.email,
              profileImg: user.auth.local.profileImg
            }
          });
        });
      });
  });
});

//
// ------ LOOK IF THERE IS TOKEN AND LOAD USER DATA
//

router.get("/user", auth, (req, res) => {
  userModel
    .findById(req.user)
    .select("-password") // not grab the password
    .then((user) => {
      //console.log(user);

      res.json(user);
    });
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

router.get(
  "/social",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/social/google-callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function(req, res) {
    let token = req.user;
    res.redirect(
      "https://intense-sands-70782.herokuapp.com/login/social/google-callback/?token=" +
        token
    );
  }
);

module.exports = router;
