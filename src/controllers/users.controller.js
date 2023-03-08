const crud = require('./crud');
const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const handleErrors = require('../utils/handleErrors');

async function create(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    crud.create(req, res, Users, { phone: req.body.phone });
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

async function sendVerification(req, res, nbr) {
  try {
    email = req.body.email;
    // console.log(email);
    const user = await Users.findOne({ email });
    if (user) {
      console.log(nbr);
      const { sendMail } = require('../utils/sendMail');
      sendMail(req.body.email, 'Reset Password', `<h1>${nbr}</h1>`);
      res.send(
        `A 4 digits code has been sent to ${req.body.email}, please enter it with the passcord as {code:xxxx , password:'pwd'} at /users/reset`
      );
    } else res.send('email not found, consider registring');
  } catch (err) {
    console.log(err);
  }
}

async function resetPassword(req, res, nbr, email) {
  console.log(nbr);
  console.log(req.body);
  console.log(email);
  const { code } = req.body;
  if (code == nbr)
    try {
      delete req.body.code;

      const user = await Users.findOne({ email });
      console.log(user);
      user.password = req.body.password = await bcrypt.hash(
        req.body.password,
        10
      );
      res.send(await Users.findByIdAndUpdate(user._id, user));
    } catch (err) {
      handleErrors(err, res);
    }
  else res.send('Invalid code');
}
module.exports = {
  create,
  getOne,
  getAll,
  update,
  delete: del,
  getCurrent,
  sendVerification,
  resetPassword,
};
