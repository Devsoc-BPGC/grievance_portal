import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from 'path';
import { fileURLToPath } from 'url';


import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
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
app.use(express.static(__dirname+'/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

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
const complaints = db.collection("complaints");
const prezHour = db.collection("prezHour");
const CSARepo = db.collection("CSARepo");

//example db
// complaints.insertOne({
//   type : 'mha'
//   user : 'ruxhik710@gmail.com',
//   name : 'Ruchik',
//   email : 'f2021122..',
//   phone: '9892887969',
//   desc : 'asdghajdgskh',
// });

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "210428474446-7sd68r5p5bnvcphf2bt38ai0v8ql1944.apps.googleusercontent.com",
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
            profilePic: profile.photos[0].value,
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
    res.redirect(`/`);
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

const middleware = (req, res, next) => {
  return next();
  // if(req.user){
  //   next();
  // }else{
  //   return res.redirect('/login')
  // }
};

app.post("/complaint/:type", middleware, async (req, res) => {
  try {
    const { type } = req.params;
    const data = await complaints.find({ id: { $in: [req.body.id] } }).toArray();
    const complaintid = data.length + 1;
    console.log(complaintid)
    await complaints.insertOne({ type: type, ...req.body, complaintid: complaintid});
    return res.status(200).send("complaint registered");
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
});

app.post("/presmessage/", middleware, async (req, res) => {
  try {
    const data = await prezHour.find({ id: { $in: [req.body.id] } }).toArray();
    const complaintid = data.length + 1;
    await prezHour.insertOne({ ...req.body, complaintid: complaintid});
    return res.status(200).send("complaint registered");
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
});


app.get("/complaints/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await complaints.find({ id: { $in: [id] } }).toArray();
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

app.get("/pressmessage/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prezHour.find({ id: { $in: [id] } }).toArray();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});



import presHourRouter from "./routers/presHour.js";
import CSARouter from "./routers/CSA.js";

app.use("/preshour", presHourRouter);

const PORT=3699;

app.use("/csa", CSARouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


