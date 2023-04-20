const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', {
    //successRedirect: '/auth/register',
    //failureRedirect: '/auth/login',
  }),
  (req, res) => {
    console.log('XXXXXXXXXXXXXXXXXXXXXX');
    console.log(`\nreq.session: ${JSON.stringify(req.session)} stringified\n`);
    console.log(`req.user: ${req.user}\n`);
    console.log(`req.sessionID: ${req.sessionID}\n`);

    res.send(req.user);
  }
);

module.exports = router;
