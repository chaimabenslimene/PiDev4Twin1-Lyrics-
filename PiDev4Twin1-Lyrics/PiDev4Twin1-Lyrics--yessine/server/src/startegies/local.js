const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const passport = require('passport');

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

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('no matching email!');
        done(null, false);
      } else
        try {
          if (await bcrypt.compare(password, user.password)) {
            console.log('user found');
            done(null, user); // serialize user
          } else {
            console.log('password incorrect');
            done(null, false);
          }
        } catch (err) {
          return done(err);
        }
    }
  )
);
