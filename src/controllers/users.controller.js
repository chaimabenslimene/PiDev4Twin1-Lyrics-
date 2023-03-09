const crud = require('./crud');
const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const handleErrors = require('../utils/handleErrors');

async function create(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    crud.create(req, res, Users, { email: req.body.email });
  } catch (err) {
    console.log(err);
    res.status(500).send('could not hash pwd');
  }
}

function getOne(req, res) {
  crud.getOne(req, res, Users);
}

function getAll(req, res) {
  crud.getAll(req, res, Users);
}

function update(req, res) {
  crud.update(req, res, Users);
}

function del(req, res) {
  crud.delete(req, res, Users);
}

function getCurrent(req, res) {
  res.send(req.user);
}

module.exports = {
  create,
  getOne,
  getAll,
  update,
  delete: del,
  getCurrent,
};
