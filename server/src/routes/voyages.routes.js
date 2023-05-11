const { Router } = require('express');
const controller = require('../controllers/voyage');

const router = Router();


router.get('/:id', (req, res) => {
    controller.getOne(req, res);
  });
  
  router.post('/', (req, res) => {
    controller.createvoyage(req, res);
  });
  router.get('/', (req, res) => {
    controller.getAll(req, res);
  });
  
 
  
  router.delete('/:id', (req, res) => {
    controller.delete(req, res);
  });
  
  router.put('/', (req, res) => {
    controller.update(req, res);
  });
  
  module.exports = router;