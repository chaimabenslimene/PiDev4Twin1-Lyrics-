const { Router } = require('express');
const controller = require('../controllers/users.controller');

const router = Router();

router.get('/getCurrent', (req, res) => {
  controller.getCurrent(req, res);
});

router.get('/:id', (req, res) => {
  controller.getOne(req, res);
});

router.post('/', (req, res) => {
  controller.create(req, res);
});

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
