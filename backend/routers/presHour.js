const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
// const prezHour = require('./models/prezHour');//update path
// const messages ="update route to api here"
//const authorizePrez = require("update path")

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString);

let conn;
async function connect() {
  try {
    conn = await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("Error connecting to MongoDB Atlas:", e);
  }
}

const authorizePrez = async (req, res, next) => {
  try {
    await connect();
    const db = conn.db("users");

    const database = db.collection("users");
    let user = await database.findOne({ googleId: req.params.id });
    if (user && user.type === "prez") {
      // res.status(200).send("prez");
      next();
    } else {
      res.status(403).send("Unauthorized Access");
    }
  } catch (error) {
    console.error("Error checking authorization:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/:id", authorizePrez, async (req, res) => {
  try {
    await connect();
    const db = conn.db("users");
    const presHourCollection = db.collection("prezHour"); // Use the correct collection name
    const allMessages = await presHourCollection.find({}).toArray();
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // finally {
  //   await closeConnection();
  // }
});

router.get("/:id/:email", async (req, res) => {
  try {
    await connect();
    const db = conn.db("users");
    const presHourCollection = db.collection("prezHour"); // Use the correct collection name
    const allMessages = await presHourCollection
      .find({ email: req.params.email })
      .toArray();
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // finally {
  //   await closeConnection();
  // }
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

// router.get("/:id", async (req, res) => {
//   let user = await database.findOne({ googleId: req.params.id });
//   if (user && user.type == "prez") {
//     //assuming example give in server.mjs files for db

//     res(200).send("prez");
//     next();
//   } else {
//     // console.log(req);
//     res.status(403).send("Unauthorized Access");
//   }
// });

router.put("/:id/:_id", authorizePrez, async (req, res) => {
  const newReply = {
    response: req.body.response,
    replyTime: new Date(),
  };

  if (!newReply.response) {
    return res.status(400).json({ msg: `Please send proper reply` });
  } else {
    try {
      await connect();
      const db = conn.db("users");
      const preshourCollection = db.collection("prezHour"); // Use the correct collection name

      const filter = { _id: new ObjectId(req.params._id) }; // Convert string to ObjectId
      const update = {
        $set: {
          response: newReply.response,
          replyTime: newReply.replyTime,
        },
      };

      // Set upsert to true to create a new document if it doesn't exist
      const options = { upsert: true, returnDocument: "after" };

      // Use findOneAndUpdate to update the document or create a new one
      const updatedDocument = await preshourCollection.findOneAndUpdate(
        filter,
        update,
        options
      );

      res.json(updatedDocument.value);
    } catch (error) {
      console.error("Error updating or creating reply:", error);
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
