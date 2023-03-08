require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users.model');

// http://localhost:5000/api/auth/google

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            isOauth: true,
            email: profile.emails[0].value,
          });
        }
        done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serlizing');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('deserlizing');
    const user = await User.findById(id);
    user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});
