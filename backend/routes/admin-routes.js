const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");
const adminController = require("../controllers/admin-controller");

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Get admin dashboard summary
router.get("/dashboard", adminController.getDashboardSummary);

// Verify admin credentials
router.get("/verify", adminController.verifyAdmin);

module.exports = router;
