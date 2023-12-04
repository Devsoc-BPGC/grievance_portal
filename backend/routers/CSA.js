import express from "express";
const router = express.Router();

import { ObjectId } from "mongodb";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
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

const authorizeCSA = async (req, res, next) => {
  try {
    await connect();
    const db = conn.db("users");
    // console.log(req.params.id);
    const database = db.collection("users");
    let user = await database.findOne({ googleId: req.params.id });
    if (user && (user.type === "CSA" || user.type === "prez")) {
      // res.status(200).send("prez");
      // console.log("st2");
      next();
    } else {
      res.status(403).send("Unauthorized Access");
    }
  } catch (error) {
    console.error("Error checking authorization:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.get("/:id", authorizeCSA, async (req, res) => {
  try {
    await connect();
    const db = conn.db("users");
    const CSACollection = db.collection("complaints"); // Use the correct collection name
    const allMessages = await CSACollection.find({}).toArray();
    // console.log(allMessages);
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id/:_id", authorizeCSA, async (req, res) => {
  const newReply = {
    response: req.body.response,
    // replyTime: new Date(),
  };

  if (!newReply.response) {
    return res.status(400).json({ msg: `Please send proper reply` });
  } else {
    try {
      await connect();
      const db = conn.db("users");
      const CSACollection = db.collection("complaints"); // Use the correct collection name

      const filter = { _id: new ObjectId(req.params._id) }; // Convert string to ObjectId
      const update = {
        $set: {
          response: newReply.response,
          // replyTime: newReply.replyTime,
        },
      };

      // Set upsert to true to create a new document if it doesn't exist
      const options = { upsert: true, returnDocument: "after" };

      // Use findOneAndUpdate to update the document or create a new one
      const updatedDocument = await CSACollection.findOneAndUpdate(
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

export default router;
