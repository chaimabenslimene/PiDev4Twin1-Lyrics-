const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/google', passport.authenticate('google'), (req, res) => {
  res.sendStatus(200);
});

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(req.user);
});

module.exports = router;
