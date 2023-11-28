import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB Atlas");
} catch(e) {
  console.error("Error connecting to MongoDB Atlas:", e);
}

const db = conn.db("users");
          
const app = express();

app.use(express.json());
app.use(cors());


app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  const database = db.collection('users');
  const complaints = db.collection('complaints')

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
        clientID: '210428474446-7sd68r5p5bnvcphf2bt38ai0v8ql1944.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3001/auth/google/callback',
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
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/`);
  }
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const middleware = (req,res,next)=>{
  return next();
  if(req.user){
    next();
  }else{
    return res.redirect('/login')
  }
}

app.post('/complaint',middleware,async (req,res)=>{
  try {
    await complaints.insertOne({...req.body,user:req.user.email});
    return res.status(200).send('complaint regeistered')
  }catch(err){
    console.log(err)
    return res.status(500).send('internal server error')
  }
})

app.get('/complaints',middleware,(req,res)=>{
  try {
    const data = complaints.find({user:req.user.email})
    return res.status(200).json(data)
  } catch(err) {
    return res.status(500).send("internal server error")
  }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
