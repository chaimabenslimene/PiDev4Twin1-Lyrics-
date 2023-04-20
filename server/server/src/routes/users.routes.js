const { Router } = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/users.controller');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post('/promote', checkRole.isSuperAdmin, controller.promote);
router.post('/demote', checkRole.isSuperAdmin, controller.demote);

router.post('/verify', (req, res) => {
  controller.verifyEmail(req, res);
});
router.post('/verifyy', (req, res) => {
  controller.verifyEmail1(req, res);
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
router.get('/', (req, res) => {
  controller.getAll(req, res);
});

// auth

router.delete('/:id', (req, res) => {
  controller.delete(req, res);
});

router.put('/', (req, res) => {
  controller.update(req, res);
});

module.exports = router;
