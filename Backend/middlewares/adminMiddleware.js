export const adminOnly = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    // console.log(user.role)
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Admins only."
  });
};
