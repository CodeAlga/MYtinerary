const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");

//
// POST CITY TO DB
//

router.post("/city/", (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country
  });
  newCity
    .save()
    .then((city) => {
      console.log(city);
      res.send(city);
      process.exit(0);
    })
    .catch((err) => {
      res.send(err);
    });
});

//
// GET ALL CITIES
//

router.get("/all", (req, res) => {
  cityModel
    .find({})
    .then((cities) => {
      res.send(cities);
    })
    .catch((err) => console.log(err));
});
//
// GET CITY BY ID
//

router.get("/:id", (req, res) => {
  // let id = req.params.id;
  // console.log(id);

  cityModel
    .findById({
      _id: req.params.id
    })
    .then(function(city) {
      res.send(city);
    })
    .catch((err) => console.log(err));
});

//
// NOT IN USE
//
//
// DELETE OPERATION THOUGH NOT NEEDED
//

router.delete("/:id", (req, res) => {
  cityModel
    .findByIdAndRemove({ _id: req.params.id }, { useFindAndModify: false })
    .then(function(city) {
      res.send(city);
    })
    .catch((err) => {
      res.status(500).send("Server error in Cities");
    });
});

//
// DELETE OPERATION THOUGH NOT NEEDED
//

router.put("/:id", (req, res) => {
  cityModel
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      cityModel.findOne(
        { _id: req.params.is }.then(function(city) {
          res.send(city);
        })
      );
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

module.exports = router;
