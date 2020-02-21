const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const { check, validationResult } = require("express-validator");
//const jwt = require("jsonwebtoken");

//
// --- HANDLING USER PROFILE IMGS
//
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  // reject file
  if (file.mimetype === "image/jpeg" || "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//
// POST USER TO DB
//

router.post(
  "/",
  [
    // email must be an email
    check("email").isEmail()
  ],
  upload.single("profileImg"),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    userModel
      .findOne({
        "auth.local.email": req.body.email
      })
      .then((user) => {
        if (!user) {
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
          console.log("didnt found user");

          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            // Store hash in your password DB.
            newUser.auth.local.password = hash;
            newUser
              .save()
              .then((user) => {
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
                      done(null, token);
                    }
                  }
                );
              })
              .catch((err) => console.log(err));
          });
        } else {
          throw new Error("That email is already registered");
          // throw new Error(
          //   res.status(401).send({ msg: "That email is already registered" })
          // );
        }
      })
      .catch((error) => {
        console.log(error);

        res.send(error);
        // retun(
        //   res.status(401).send({ msg: "That email is already registered" })
        // );
      });
  }
);

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
