const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//
// POST USER TO DB
//

router.post("/", (req, res) => {
  const newUser = new userModel({
    fname: req.body.fname,
    lname: req.body.lname,
    userName: req.body.userName,
    bday: req.body.bday,
    city: req.body.city,
    profileImg: req.body.profileImg,
    email: req.body.email,
    password: req.body.password
  });
  userModel
    .findOne({
      email: req.body.email
    })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          // Store hash in your password DB.
          newUser.password = hash;
          userModel
            .create(newUser)
            .then((user) => res.json({ status: user.email + "registered!" }))
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.json({ error: "That email is already registered" });
      }
    })
    .catch((err) => res.send(err));
});

//
// GET ALL USERS
//

router.get("/all", (req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => console.log(err));
});

//
// GET USER BY ID
//

router.get("/user/:id", (req, res) => {
  userModel
    .findById({
      _id: req.params.id
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
