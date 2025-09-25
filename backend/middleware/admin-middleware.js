const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "adminSecretKey123456789";

const adminMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if auth header exists and has the right format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      } // Get admin from database
      const admin = await Admin.findById(decoded.adminId);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Check if admin role is valid
      if (admin.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Access denied. Admin privileges required." });
      }

      // Add admin to request object
      req.admin = admin;
      next();
    });
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ message: "Server authentication error" });
  }
};

module.exports = adminMiddleware;
