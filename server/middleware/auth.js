const config = require("../passport");
//const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //console.log("here with " + token);

  //
  // --- LOOK FOR TOKEN

  if (!token) {
    return res.status(401).json({ msg: "No token. Unathorised" });
  }

  try {
    //
    // --- IF FOUND

    const id = jwtdecode(token).id;
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //
    // -- ADD USER FROM PAYLOAD

    req.user = id;

    next();
  } catch (exception) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
