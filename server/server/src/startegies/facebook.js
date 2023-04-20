require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users.model');

// http://localhost:5000/api/auth/facebook

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_REDIRECT_URL,
      profileFields: ['displayName', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            //username: profile.displayName,
            username: 'Yessine Rekik',
            isOauth: true,
            isVerified: true,
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
  console.log('serializing');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('deserliazing');
    const user = await User.findById(id);
    user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});
