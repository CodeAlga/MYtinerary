const express = require("express");
const router = express.Router();
const itinerayModel = require("../model/itineraryModel");

//
// POST CITY TO DB
//

router.post("/itinerary/", (req, res) => {
  const newItinerary = new itinerayModel({
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
// GET ALL ITINERARIES FOR A GIVEN CITY
//

router.get("/all", (req, res) => {
  itinerayModel
    .find({})
    .then((itinerearies) => {
      res.send(itinerearies);
    })
    .catch((err) => console.log(err));
});
//
// GET ITINERART BY ID
//

router.get("/:id", (req, res) => {
  itinerayModel
    .findById({ _id: req.params.id })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
