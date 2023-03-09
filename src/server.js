require('dotenv').config();
require('./database/index');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const componentsRouter = require('./routes/components');

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on Port ${PORT}`)
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'very secret',
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/pi',
    }),

    cookie: {
      secure: false,
    },
  })
);
app.use((req, res, next) => {
  console.log('req session id ------------------>');
  console.log(req.sessionID);
  next();
});

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  console.log(`\ninside ${req.method}: ${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', componentsRouter);
