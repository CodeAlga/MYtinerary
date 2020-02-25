const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  activity_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity"
  },
  comment: {
    type: String
  },
  user: {
    type: String
  },
  timestamp: {
    type: String
  }
});

module.exports = mongoose.model("comment", commentSchema);
