const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/admin-auth-controller");
const { adminAuthMiddleware } = require("../middleware/admin-auth-middleware");

// Debug route to test if admin-auth routes are working
router.get("/status", (req, res) => {
  res.status(200).json({
    message: "Admin auth routes are working",
    timestamp: new Date().toISOString(),
  });
});

// Admin login route
router.post("/login", adminAuthController.adminLogin);

// Get admin profile (protected route)
router.get(
  "/profile",
  adminAuthMiddleware,
  adminAuthController.getAdminProfile
);

module.exports = router;
