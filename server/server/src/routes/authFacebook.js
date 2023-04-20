const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
    // failureRedirect: 'http://localhost:3000/login',
    // successRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login',
    successRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
