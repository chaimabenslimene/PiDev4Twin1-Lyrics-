const { Router } = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/users.controller');

const router = Router();

let nbr = Math.floor(1000 + Math.random() * 9000);
let email;

router.post('/verify', (req, res) => {
  email = req.body.email;
  controller.sendVerification(req, res, nbr);
});
router.post('/reset', (req, res) =>
  controller.resetPassword(req, res, nbr, email)
);

router.get('/getCurrent', (req, res) => {
  controller.getCurrent(req, res);
});

router.get('/:id', (req, res) => {
  controller.getOne(req, res);
});

router.post('/', (req, res) => {
  controller.create(req, res);
});

// auth
router.use((req, res, next) => auth(req, res, next));

router.delete('/:id', (req, res) => {
  controller.delete(req, res);
});

router.put('/', (req, res) => {
  controller.update(req, res);
});

router.get('/', (req, res) => {
  controller.getAll(req, res);
});

module.exports = router;
