const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  auth: {
    origin: { type: String },
    local: {
      fname: {
        type: String
      },
      lname: {
        type: String
      },
      bday: {
        type: String
      },
      city: {
        type: String
      },
      profileImg: {
        type: String
      },
      userName: {
        type: String
      },
      email: {
        type: String,
        unique: true
      },
      password: {
        type: String
      }
    },
    social: {
      socialId: {
        type: String
      },
      fname: {
        type: String
      },
      lname: {
        type: String
      },
      profileImg: {
        type: String
      },
      userName: {
        type: String
      },
      email: {
        type: String,
        unique: true
      }
    }
  }
});

module.exports = mongoose.model("user", userSchema);
