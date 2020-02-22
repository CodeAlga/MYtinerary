const config = require("../server/passport");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log("here with " + token);

  //
  // --- LOOK FOR TOKEN

  if (!token) {
    return res.status(401).json({ msg: "No token. Unathorised" });
  }

  try {
    //
    // --- IF FOUND

    const decoded = jwt.verify(token, config.get("jsonwebtoken"));

    //
    // -- ADD USER FROM PAYLOAD

    req.user = decoded;
    next();
  } catch (exception) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
