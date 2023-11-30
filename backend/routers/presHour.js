const express = require("express");
const router = express.Router();
// const prezHour = require('./models/prezHour');//update path
// const messages ="update route to api here"
//const authorizePrez = require("update path")

const authorizePrez = (req, res, next) => {
  if (req.user && req.user.type === "prez") {
    //assuming example give in server.mjs files for db
    next();
  } else {
    res.status(403).send("Unauthorized Access");
  }
};

router.get("/", authorizePrez, async (req, res) => {
  const allComplaints = await messages.displayPrezHours(); //make a displayPrezHour.find({}) function with auth in the api
  res.json(allComplaints);
});

// router.get("/", authorizePrez, async (req, res) => {
//   try {
//     const allComplaints = await prezHour.find({}); //sending get request form here only.
//     res.json(allComplaints);
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.put("/", authorizePrez, async (req, res) => {
  //assuming in the db every message very have reply field
  const newReply = {
    replyContent: req.body.content, //update, add the needed fields
    replyTime: new Date(),
  };

  if (!newReply.replyContent) {
    return res.status(400).json({ msg: `Please send proper reply` });
  } else {
    try {
      const addedReply = await movies.addPrezHourReply(newReply, req.body._id);
      res.json(addedReply);
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// router.put("/:id", authorizePrez, async (req, res) => {
//   //id of the earlier re
//   const movieId = req.params.id;
//   const updatedMovieData = req.body; // Assuming the updated data is sent in the request body

//   if (!newReply.content) {
//     return res.status(400).json({ msg: `Please send name and genre` });
//   } else {
//     try {
//       const addedReply = await movies.insertPrezHourReply(newReply);
//       res.json(addedReply);
//     } catch (error) {
//       console.error("Error adding movie:", error);
//       res.status(500).json({ msg: "Internal Server Error" });
//     }
//   }
// });

module.exports = router;
