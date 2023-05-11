const isAdmin = (req, res, next) => {
  req.user.isAdmin ? next() : res.sendStatus(403);
};
module.exports = isAdmin;
