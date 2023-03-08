const jwt = require('jsonwebtoken');

function getJwt(data) {
  return jwt.sign(
    {
      data,
    },
    'SECRETKEY',
    { expiresIn: '5m' }
  );
}

module.exports = { getJwt };
