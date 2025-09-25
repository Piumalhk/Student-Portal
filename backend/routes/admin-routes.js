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

// Feedback management routes
router.get("/feedback", adminController.getAllFeedback);
router.put("/feedback/:id/status", adminController.updateFeedbackStatus);
router.delete("/feedback/:id", adminController.deleteFeedback);

// Schedule management routes
router.get("/schedule", adminController.getSchedule);
router.post("/schedule", adminController.addScheduleItem);
router.delete("/schedule/:id", adminController.deleteScheduleItem);

// Announcements management routes
router.get("/announcements", adminController.getAnnouncements);
router.post("/announcements", adminController.createAnnouncement);
router.put("/announcements/:id", adminController.updateAnnouncement);
router.delete("/announcements/:id", adminController.deleteAnnouncement);

module.exports = router;
