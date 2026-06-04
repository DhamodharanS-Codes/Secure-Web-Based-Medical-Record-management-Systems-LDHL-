module.exports = function (allowedRoles) {
  return (req, res, next) => {

    // Normalize to array
    if (!Array.isArray(allowedRoles)) {
      allowedRoles = [allowedRoles];
    }

    console.log(" Allowed roles:", allowedRoles);
    console.log(" User role:", req.user.role);

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
        debug: {
          expected: allowedRoles,
          received: req.user ? req.user.role : null
        }
      });
    }

    next();
  };
};
