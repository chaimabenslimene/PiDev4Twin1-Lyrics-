const crud = require('./crud');
const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const handleErrors = require('../utils/handleErrors');

async function create(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    delete req.body.role;
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
  delete req.body.role;
  crud.update(req, res, Users);
}

function del(req, res) {
  crud.delete(req, res, Users);
}

function getCurrent(req, res) {
  res.send(req.user);
}

async function promote(req, res) {
  const { id, promote } = req.body;
  try {
    const user = await Users.findById(id);
    if (user?.role < 2) {
      if (promote == true) {
        user.role++;
        await Users.findByIdAndUpdate(id, {
          role: user.role,
          isAskingPromotion: false,
        });
        return res.send(`Promoted to ${user.role}`);
      } else {
        await Users.findByIdAndUpdate(id, {
          isAskingPromotion: false,
        });
        return res.send(`Promotion rejected`);
      }
    }
    res.sendStatus(204);
  } catch (err) {
    handleErrors(err, res);
  }
}

async function demote(req, res) {
  const { id } = req.body;
  try {
    const user = await Users.findById(id);
    if (user?.role > 0) {
      user.role--;
      await Users.findByIdAndUpdate(id, {
        role: user.role,
      });
      return res.send(`Demoted to ${user.role}`);
    }
    res.sendStatus(204);
  } catch (err) {
    handleErrors(err, res);
  }
}

module.exports = {
  create,
  getOne,
  getAll,
  update,
  delete: del,
  getCurrent,
  promote,
  demote,
};
