// Middleware สำหรับตรวจสอบสิทธิ์ Admin
const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access Denied: Admins Only" });
  }
  next();
};

module.exports = adminMiddleware;
