const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
//const cors = require("cors");
const db = require("./keys").mongoURI;
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//app.use(cors());

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to fanchy smanchy Mongo DB"))
  .catch((err) => console.log(err));

//
// GETTING ROUTES
//

app.use("/cities", require("./routes/cities"));

app.listen(port, () => {
  console.log("Fanchy smanchy server is runing on port " + port);
});

module.exports = app;
