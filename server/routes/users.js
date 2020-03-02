const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//	//
//  // --- HANDLING USER PROFILE IMGS
//	//
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
  if (file.mimetype === "image/jpeg" || "image/png" || "image/jpeg") {
    console.log("got the file ok");

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
// ---- POST USER TO DB
//

router.post("/user", upload.single("profileImg"), (req, res) => {
  const {
    origin,
    fname,
    lname,
    bday,
    city,
    profileImg,
    userName,
    email,
    password
  } = req.body;

  //
  // ----- VALIDATION

  if (!fname || !lname || !userName || !email || !password) {
    return res.status(400).json({ msg: "Please enter required fields" });
  }

  //
  // ------ LOOK IF USER EXISTS BY EMAIL

  userModel.findOne({ "auth.local.email": req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "That email is already registered" });
    }
    const newUser = new userModel({
      "auth.origin": "local",
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
      //if (err) throw err;
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

// //
// // ----------- DEALING WITH FAVOURITES
// //

router.put("/addfav/:id", auth, (req, res) => {
  userModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { "auth.favourites": req.body.fav } }
    )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Could not save that favourite");
    });
});

router.put("/removefav/:id", auth, (req, res) => {
  userModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { "auth.favourites": req.body.fav } }
    )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Could not save that favourite");
    });
});

//
// ----  TEST FOR POSTMAN
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

module.exports = router;
