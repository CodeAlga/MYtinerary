const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
//const cors = require("cors");
require("dotenv").config();
const path = require("path");

const db = require("./keys").mongoURI;
const mongoose = require("mongoose");

const passport = require("./passport");

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to fanchy smanchy Mongo DB"))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// // GETTING PROFILE IMGS
app.use("/uploads", express.static("uploads"));

// //
// // GETTING ROUTES
// //

app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));
app.use("/activities", require("./routes/activities"));
app.use("/users", require("./routes/users"));
app.use("/authentication", require("./routes/authentication"));
app.use("/comments", require("./routes/comments"));

// //
// // SERVE STATIC ASSETS IF PRODUCCTION
// //
if (process.env.NODE_ENV === "production") {
  // // Set static folder
  app.user(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Fanchy smanchy server is runing on port " + port);
});

module.exports = app;
