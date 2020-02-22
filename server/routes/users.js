const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//const multer = require("multer");
//const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("../passport");
const auth = require("../../middleware/auth");

//
// ---- POST USER TO DB
//

router.post("/auth/user", auth, (req, res) => {
  const { fname, lname, bday, city, userName, email, password } = req.body;

  //
  // ----- VALIDATION

  if (!fname || !lname || !userName || !email || !password) {
    return res.status(400).json({ msg: "Please enter required fields" });
  }

  //
  // ------ LOOK IF USER EXISTS BY EMAIL

  userModel.findOne({ "auth.local.email": req.body.email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "That email is already registered" });

    const newUser = new userModel({
      "auth.local.fname": req.body.fname,
      "auth.local.lname": req.body.lname,
      "auth.local.userName": req.body.userName,
      "auth.local.profileImg": req.body.profileImg,
      "auth.local.bday": req.body.bday,
      "auth.local.city": req.body.city,
      "auth.local.email": req.body.email,
      "auth.local.password": req.body.password
    });
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) throw err;
      newUser.auth.local.password = hash;
      newUser.save().then((user) => {
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
      });
    });
  });
});

//
// ----  TEST FOR POSTMAN
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

module.exports = router;
