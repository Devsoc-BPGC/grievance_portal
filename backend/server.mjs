import express from 'express';
import cors from 'cors';
import db from './db/conn.mjs';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
          

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
    res.redirect(`http://localhost:3000/dashboard/${req.user.googleId}`);
  }
);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
