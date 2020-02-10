const express = require("express");
const router = express.Router();
const activityModel = require("../model/activityModel");

//
// POST CITY TO DB
//

router.post("/activity/", (req, res) => {
  const newActivity = new activityModel({
    city_ref: req.body.city_ref,
    itinerary_ref: req.body.itinerary_ref,
    name: req.body.name,
    address: req.body.address,
    img: req.body.img,
    hours: req.body.hours,
    cost: req.body.cost,
    comments: req.body.comments
  });
  newActivity
    .save()
    .then((activity) => {
      res.send(activity);
    })
    .catch((err) => {
      res.send(err);
    });
});

//
// GET ALL ACTIVITIES
//

router.get("/all", (req, res) => {
  activityModel
    .find({})
    .then((activities) => {
      res.send(activities);
    })
    .catch((err) => console.log(err));
});

//
// GET ALL ACTIVITIES FOR A GIVEN ITINERARIES
//

router.get("/itinerary/:id", (req, res) => {
  activityModel
    .find({ itinerary_ref: req.params.id })
    .then((activities) => {
      res.send(activities);
    })
    .catch((err) => console.log(err));
});

//
// GET ACTIVITY BY ID
//

router.get("/activity/:id", (req, res) => {
  // let id = req.params.id;
  // console.log(id);

  activityModel
    .findById({
      _id: req.params.id
    })
    .then(function(activity) {
      res.send(activity);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
