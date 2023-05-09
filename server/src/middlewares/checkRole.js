const isSuperAdmin = (req, res, next) => {
  req.user?.isAdmin === true ? next() : res.sendStatus(403);
};

const isAdmin = (req, res, next) => {
  req.user?.isAdmin === true ? next() : res.sendStatus(403);
};

module.exports = { isSuperAdmin, isAdmin };
