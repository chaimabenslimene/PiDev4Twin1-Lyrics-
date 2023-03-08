const { Router } = require('express');
const jwt = require('jsonwebtoken');

const Users = require('../models/users.model');

const router = Router();

router.get('/verify/:token', (req, res) => {
  const { token } = req.params;

  jwt.verify(token, 'SECRETKEY', async (err, decoded) => {
    if (err) {
      console.log(err);
      res
        .status(401)
        .send(
          'Email verification failed, possibly the link is invalid or expired'
        );
    } else {
        try {
          await Users.findByIdAndUpdate(decoded.data, { isVerified: true });
        } catch (err) {
          res.sendStatus(500);
        }
      //res.send(decoded);
      res.send(token);
    }
  });
});

module.exports = router;
