require('dotenv').config();
require('./database/index');
require('./startegies/local');
require('./startegies/google');
require('./startegies/facebook');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const panierRoutes = require('./routes/Cart');
const loginRouter = require('./routes/login');
const componentsRouter = require('./routes/components');
const logoutRouter = require('./routes/logout');
const authGoogle = require('./routes/authGoggle');
const authFacebook = require('./routes/authFacebook');
const verifyJwt = require('./routes/verifyJwt');
const trendRouter= require ('./routes/trend')




var path = require('path');
var logger = require('morgan');
const paymentRouter = require("./routes/payment")


const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

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
      autoRemove: 'interval',
      autoRemoveInterval: 15,
    }),

    cookie: {
      secure: false,
      maxAge: 900000,
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

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', loginRouter);
app.use('/api', componentsRouter);
app.use('/api/auth', logoutRouter);
app.use('/api/auth', authGoogle);
app.use('/api/auth', authFacebook);
app.use('/', verifyJwt);
app.use('/trends', trendRouter);
app.use('/api/cart', panierRoutes);


app.use("/api", paymentRouter );




 

