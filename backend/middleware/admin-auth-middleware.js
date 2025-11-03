const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "adminSecretKey123456789";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No admin token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Check if it's an admin token
    if (!decoded.role || decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    // Check if admin still exists in database
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res
        .status(401)
        .json({ message: "Admin account no longer exists." });
    }

    // Add admin data to request
    req.adminId = decoded.adminId;
    req.adminUsername = decoded.username;
    req.adminPermissions = decoded.permissions;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Admin token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid admin token" });
    }
    console.error("Admin auth middleware error:", error);
    return res
      .status(500)
      .json({ message: "Server error during admin authentication" });
  }
};

// Middleware to check specific admin permissions
const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.adminPermissions || !req.adminPermissions[permission]) {
      return res.status(403).json({
        message: `Access denied. Missing required permission: ${permission}`,
      });
    }
    next();
  };
};

module.exports = {
  adminAuthMiddleware,
  checkPermission,
};
