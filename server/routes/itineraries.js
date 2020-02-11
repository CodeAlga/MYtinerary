const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

//
// POST CITY TO DB
//

router.post("/itinerary/", (req, res) => {
  const newItinerary = new itineraryModel({
    city_ref: req.body.city_ref,
    name: req.body.name,
    city: req.body.city,
    country: req.body.country,
    username: req.body.username,
    duration: req.body.duration,
    price: req.body.price,
    hashtags: req.body.hashtags
  });
  newItinerary
    .save()
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => {
      res.send(err);
    });
});

//
// GET ALL ITINERARIES
//

router.get("/all", (req, res) => {
  itineraryModel
    .find({})
    .then((itinerearies) => {
      res.send(itinerearies);
    })
    .catch((err) => console.log(err));
});

//
// GET ALL ITINERARIES FOR A GIVEN CITY
//

router.get("/city/:id", (req, res) => {
  itineraryModel
    .find({ city_ref: req.params.id })
    .then((itinerearies) => {
      res.send(itinerearies);
    })
    .catch((err) => console.log(err));
});

//
// GET ITINERART BY ID
//

router.get("/itinerary/:id", (req, res) => {
  itineraryModel
    .findById({ _id: req.params.id })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});

//
// UPDATE OPERATION THOUGH NOT NEEDED
//

router.put("/:id", (req, res) => {
  itineraryModel
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      itineraryModel.findOne({ _id: req.params.id }).then(function(itinerary) {
        res.send(itinerary);
      });
    })
    .catch((err) => {
      res.send("Server error" + err);
    });
});

module.exports = router;
