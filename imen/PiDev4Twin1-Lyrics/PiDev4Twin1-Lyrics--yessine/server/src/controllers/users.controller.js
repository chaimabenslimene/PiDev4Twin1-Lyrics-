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

async function verifyEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const jwt = require('../utils/jwt');
      const token = jwt.getJwt(user._id);
      await Users.findOneAndUpdate({ email }, { token });

      const { sendMail } = require('../utils/sendMail');
      const html =
        '<p> \
          Hi! There, You have recently visited our website and entered your\
          email. Please follow the given --- \
          <a href=' +
        `http://localhost:3000/resetPassword/${token}` +
        '>link</a> --- to verify\
          your email. Thanks\
        </p>';

      sendMail(email, 'Email Verfication', html);
      res.send(token);
    } else {
      res.status(204).send('no matching email !');
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function verifyEmail1(req, res) {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const jwt = require('../utils/jwt');
      const token = jwt.getJwt(user._id);
      await Users.findOneAndUpdate({ email }, { token });

      const { sendMail } = require('../utils/sendMail');
      const html =
        '<p> \
          Hi! There, You have recently visited our website and entered your\
          email. Please follow the given --- \
          <a href=' +
        `http://localhost:3000/login` +
        '>link</a> --- to verify\
          your email. Thanks\
        </p>';

      sendMail(email, 'Email Verfication', html);
      res.send(token);
    } else {
      res.status(204).send('no matching email !');
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
async function resetPassword(req, res) {
  let { password, token } = req.body;
  try {
    password = await bcrypt.hash(password, 10);
    (await Users.findOneAndUpdate(
      { token: token },
      { password, $unset: { token: 1 } }
    ))
      ? res.send('updated')
      : res.status(204).send('user not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
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
  verifyEmail,
  verifyEmail1,
  resetPassword,
  promote,
  demote,
};
