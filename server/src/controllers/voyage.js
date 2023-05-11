const crud = require('./crud');
const Voyage = require('../models/voyage');
const handleErrors = require('../utils/handleErrors');


async function createvoyage(req, res) {
   
     
      crud.createvoyage(req, res, Voyage );
 
     
    }
  


function getOne(req, res) {
    crud.getOne(req, res, Voyage);
  }
  
  function getAll(req, res) {
    crud.getAll(req, res, Voyage);
  }
  
function update(req, res) {
    crud.update(req, res, Voyage);
  }
  
  function del(req, res) {
    crud.delete(req, res, Voyage);
  }
  
 
  
module.exports = {
    createvoyage,
    getOne,
    getAll,
    update,
    delete: del,
  
 
  };