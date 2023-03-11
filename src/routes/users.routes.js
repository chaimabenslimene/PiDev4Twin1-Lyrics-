const { Router } = require('express');
const controller = require('../controllers/users.controller');
const checkRole = require('../middlewares/checkRole');

const router = Router();
// /api/users/

router.get('/getCurrent', (req, res) => {
  controller.getCurrent(req, res);
});

router.post('/promote', checkRole.isSuperAdmin, controller.promote);
router.post('/demote', checkRole.isSuperAdmin, controller.demote);

router.get('/:id', (req, res) => {
  controller.getOne(req, res);
});

router.post('/', (req, res) => {
  controller.create(req, res);
});

router.get('/', (req, res) => {
  controller.getAll(req, res);
});

router.delete(
  '/:id',
  (req, res, next) => {
    // if not the user himself and not a super admin --> forbidden
    if (req.params?.id != req.user?.id && req.user?.role !== 2)
      res.sendStatus(403);
    else next();
  },
  (req, res) => {
    controller.delete(req, res);
  }
);

router.put(
  '/',
  (req, res, next) => {
    // if not the user himself and not a super admin --> forbidden
    if (req.body?.id != req.user?.id && req.user?.role !== 2)
      res.sendStatus(403);
    else next();
  },
  (req, res) => {
    controller.update(req, res);
  }
);

module.exports = router;
