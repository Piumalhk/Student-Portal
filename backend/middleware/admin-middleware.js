const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "mySecretKey123456789";

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
      }

      // Get user from database to check role
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if user is admin
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Access denied. Admin privileges required." });
      }

      // Add user to request object
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ message: "Server authentication error" });
  }
};

module.exports = adminMiddleware;
