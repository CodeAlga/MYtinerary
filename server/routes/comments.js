const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");
const auth = require("../middleware/auth");

// //
// // POST COMMENT
// //

router.post("/activity/:id", auth, (req, res) => {
  var today = new Date();

  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "/" + mm;

  const newComment = new commentModel({
    activity_ref: req.body.activity_ref,
    comment: req.body.comment,
    user: req.body.user,
    user_ref: req.body.user_ref,
    timestamp: today
  });
  newComment
    .save()
    .then(async (comment) => {
      await res.json(comment);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not post the comment" });
    });
});

//
//  GET COMMENTS FOR GIVEN ACTIVITY
//

router.get("/activity/:id", (req, res) => {
  commentModel
    .find({ activity_ref: req.params.id })
    .then((comments) => {
      res.send(comments);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not get comments" });
    });
});

//
//  DELETE COMMENT
//
router.delete("/:id", auth, (req, res) => {
  commentModel
    .findByIdAndRemove({ _id: req.params.id }, { useFindAndModify: false })
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Could not delete the comment" });
    });
});

module.exports = router;
