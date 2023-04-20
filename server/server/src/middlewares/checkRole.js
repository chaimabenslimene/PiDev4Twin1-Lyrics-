const isSuperAdmin = (req, res, next) => {
  req.user?.role === 2 ? next() : res.sendStatus(403);
};

const isAdmin = (req, res, next) => {
  req.user?.role === 1 ? next() : res.sendStatus(403);
};

module.exports = { isSuperAdmin, isAdmin };
