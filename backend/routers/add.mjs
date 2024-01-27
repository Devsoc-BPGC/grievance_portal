// index.mjs
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
const port = 5002;

const mongoURI = "mongodb+srv://arjit:arjit1206@cluster0.iret1e1.mongodb.net/";
const dbName = "users"; // db
app.use(express.json());
app.use(cors());

async function connectToDB() {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

app.post("/", async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    if (!name || !email || !googleId) {
      return res
        .status(400)
        .json({ error: "Name, email, and googleId are required" });
    }

    const db = await connectToDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      name,
      email,
      googleId,
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    await usersCollection.insertOne({ name, email, googleId });
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
