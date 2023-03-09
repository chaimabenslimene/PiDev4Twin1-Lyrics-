const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
