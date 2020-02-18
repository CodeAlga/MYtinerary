const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
// ----- USER AUTHENTICATION
//

router.post("/login", (req, res) => {
  userModel
    .findOne({
      email: req.body.email
    })
    .then((user) => {
      if (!user) {
        return res.status(402).json({ msg: "We couldn't find that email!" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result == true) {
            console.log("Im logged in");
            const payload = {
              id: user.id,
              username: user.username,
              profileImg: user.profileImg
            };
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
                  res.json({
                    success: true,
                    token: token
                  });
                }
              }
            );
          } else {
            return res.status(402).json({ msg: "Wrong password!" });
            //res.send(new Error());
            //res.status(402).json({ msg: "Wrong password!" });
            //res.status(402).json({ msg: "Wrong password!" });
          }
        });
      }
    });
});

module.exports = router;
