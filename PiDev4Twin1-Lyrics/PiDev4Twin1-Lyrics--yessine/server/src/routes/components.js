const { Router } = require('express');
const users = require('./users.routes');
const Voyage = require('./voyages.routes');
const router = Router();

router.use('/users', users);

router.use('/Voyage', Voyage);
module.exports = router;
