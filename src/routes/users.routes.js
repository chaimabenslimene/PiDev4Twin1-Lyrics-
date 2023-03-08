const { Router } = require('express');
const controller = require('../controllers/users.controller');

const router = Router();

router.post('/verify', (req, res) => {
  controller.verifyEmail(req, res);
});

router.post('/reset', (req, res) => {
  controller.resetPassword(req, res);
});

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
