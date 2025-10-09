const express = require("express");
const router = express.Router();
const { getPublicAnnouncements, getPublicSchedule } = require("../controllers/admin-controller");

// Public routes (no authentication required)
router.get("/announcements", getPublicAnnouncements);
router.get("/schedule", getPublicSchedule);

module.exports = router;