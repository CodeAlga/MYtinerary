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

    const newUser = new userModel({
      fname: req.body.fname,
      lname: req.body.lname,
      userName: req.body.userName,
      profileImg: req.body.profileImg,
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
              .then((user) => res.json({ status: user + " registered!" }))
              .catch((err) => {
                res.send(err);
              });
          });
        } else {
          throw new Error();
          // throw new Error(
          //   res.status(401).send({ msg: "That email is already registered" })
          // );
        }
      })
      .catch((error) => {
        console.log("error");
        retun(
          res.status(401).send({ msg: "That email is already registered" })
        );
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

// //
// // ----- USER AUTHENTICATION
// //

// router.post("/login", (req, res, next) => {
//   userModel
//     .findOne({
//       email: req.body.email
//     })
//     .then((user) => {
//       if (!user) {
//         return res.status(402).json({ msg: "User does not exist" });
//       } else {
//         bcrypt.compare(req.body.password, user.password, (err, result) => {
//           if (result == true) {
//             //console.log("Im logged in");
//             const payload = {
//               id: user.id,
//               username: user.username,
//               profileImg: user.profileImg
//             };
//             const options = { expiresIn: 2592000 };
//             jwt.sign(
//               payload,
//               process.env.DB_JWT_SECRET,
//               options,
//               (err, token) => {
//                 if (err) {
//                   res.json({
//                     success: false,
//                     token: "There was an error loggin you in"
//                   });
//                 } else {
//                   res.json({
//                     success: true,
//                     token: token
//                   });
//                 }
//               }
//             );
//           } else {
//             return res.status(402).json({ msg: "Wrong password!" });
//             //res.send(new Error());
//             //res.status(402).json({ msg: "Wrong password!" });
//             //res.status(402).json({ msg: "Wrong password!" });
//           }
//         });
//       }
//     });
// });

module.exports = router;
