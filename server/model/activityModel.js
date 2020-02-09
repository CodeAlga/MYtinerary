const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  city_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City"
  },
  itinerary_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Itinerary"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  img: {
    type: Array
  },
  hours: {
    type: Number
  },
  cost: {
    type: String,
    required: true
  },
  comments: {
    type: Array
  }
});

module.exports = mongoose.model("activity", activitySchema);
