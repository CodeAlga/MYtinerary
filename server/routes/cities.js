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

router.post("/", (req, res) => {
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
      res.status(500).send("Server error");
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
