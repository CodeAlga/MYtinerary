const mongoose = require("mongoose");
const cityModel = require("../model/cityModel");

const itinerarySchema = new mongoose.Schema({
  city_ref: {
    type: mongoose.ObjectId
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hashtags: {
    type: Array
  },
  rating: {
    type: Number
  }
});
module.exports = mongoose.model("itinerary", itinerarySchema);
