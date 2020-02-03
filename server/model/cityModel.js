const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  }
});

// MODULE EXPORTS THE SINGULAR (CITY) OF THE NAME OF THE DB (CITIES)
module.exports = mongoose.model("city", citySchema);
