const adminMiddleware = (req, res, next) => {
  // authMiddleware runs before this, so req.user should exist
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: "Access denied. Admins only." });
  }
};

module.exports = adminMiddleware;