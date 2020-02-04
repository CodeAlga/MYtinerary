const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");

//
// GET ALL CITIES
//

router.get("/all", (req, res) => {
  cityModel
    .find({})
    .then((files) => {
      res.send(files);
    })
    .catch((err) => console.log(err));
});

router.post("/", function(req, res) {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country
  });
  newCity
    .save()
    .then((city) => {
      res.send(city);
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
