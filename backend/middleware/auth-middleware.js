const jwt = require("jsonwebtoken");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "mySecretKey123456789";

const verifyToken = (req, res, next) => {
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
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Add user ID to request object for use in protected routes
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server authentication error" });
  }
};

module.exports = verifyToken;
