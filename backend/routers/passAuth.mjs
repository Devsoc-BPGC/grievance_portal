import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString =
  "mongodb+srv://arjit:arjit1206@cluster0.iret1e1.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect(connectionString);
  console.log("Connected to MongoDB Atlas");
} catch (e) {
  console.error("Error connecting to MongoDB Atlas:", e);
}

const db = conn.db("users");

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
}); //use if the build of the frontend is present in the public folder, update /auth/google/callback accordingly

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const database = db.collection("users");
// const complaints = db.collection("complaints");
// const prezHour = db.collection("prezHour");
// const CSARepo = db.collection("CSARepo");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "947655424251-3edn5acgi068lhgj5ap8u16lqctltgih.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await database.findOne({ googleId: profile.id });
        console.log(profile);
        if (!user) {
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          };
          const result = await database.insertOne(newUser);
          if (result.acknowledged) {
            user = newUser;
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`/`); //update
  }
);

app.get("/api/getUser", (req, res) => {
  console.log("get user");
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(403).send("Unauthorized User");
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send("User not found.");
  }
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
