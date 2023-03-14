const { Router } = require('express');

const router = Router();

router.get('/logout', (req, res) => {
  console.log('loggingout');
  res.clearCookie('connect.sid');
  res.send(200);
});

module.exports = router;
