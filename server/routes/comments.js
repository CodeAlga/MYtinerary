const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");
//const auth = require("../middleware/auth");

// //
// // POST COMMENT
// //

router.post("/activity/:id", (req, res) => {
  //   if (!auth)
  //     return res.status(401).json({ msg: "You need to be logged in to comment" });

  var today = new Date();
  console.log(today);

  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "/" + mm;
  console.log(today);

  const newComment = new commentModel({
    activity_ref: req.body.activity_ref,
    comment: req.body.comment,
    user: req.body.user,
    timestamp: today
  });
  newComment
    .save()
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not post the comment" });
    });
});

//
//  GET COMMENTS FOR GIVEN ACTIVITY
//

router.get("/activity/:id", (req, res) => {
  console.log(req.params.id);

  commentModel
    .find({ activity_ref: req.params.id })
    .then((comments) => {
      console.log(comments);

      res.send(comments);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not get comments" });
    });
});

//
//  DELETE COMMENT
//
router.delete("/:id", (req, res) => {
  commentModel
    .findByIdAndRemove({ _id: req.params.id }, { useFindAndModify: false })
    .then(function(comment) {
      res.send(comment);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not delete the comment" });
    });
});

module.exports = router;
