const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");
const Notice = require("../models/Notice");

const router = express.Router();

// Get all public notices - available to all users
router.get("/public", async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get active notices with pagination
    const notices = await Notice.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalNotices = await Notice.countDocuments({ isActive: true });

    res.status(200).json({
      notices,
      pagination: {
        total: totalNotices,
        page,
        pages: Math.ceil(totalNotices / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching public notices:", error);
    res.status(500).json({ message: "Error fetching notices" });
  }
});

// Get all notices (including inactive) - admin only
router.get("/", adminMiddleware, async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get all notices with pagination
    const notices = await Notice.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalNotices = await Notice.countDocuments();

    res.status(200).json({
      notices,
      pagination: {
        total: totalNotices,
        page,
        pages: Math.ceil(totalNotices / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching all notices:", error);
    res.status(500).json({ message: "Error fetching notices" });
  }
});

// Create new notice - admin only
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const { title, content, isImportant, isActive } = req.body;

    // Create new notice
    const newNotice = new Notice({
      title,
      content,
      isImportant: isImportant || false,
      isActive: isActive !== false, // Default to true if not specified
      createdBy: req.user._id,
      createdAt: new Date(),
    });

    // Save to database
    await newNotice.save();

    res.status(201).json({
      message: "Notice created successfully",
      notice: newNotice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ message: "Error creating notice" });
  }
});

// Update a notice - admin only
router.patch("/:id", adminMiddleware, async (req, res) => {
  try {
    const { title, content, isImportant, isActive } = req.body;

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    // Update fields if provided
    if (title !== undefined) notice.title = title;
    if (content !== undefined) notice.content = content;
    if (isImportant !== undefined) notice.isImportant = isImportant;
    if (isActive !== undefined) notice.isActive = isActive;

    // Save to database
    await notice.save();

    res.status(200).json({
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({ message: "Error updating notice" });
  }
});

// Delete a notice - admin only
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    // Delete from database
    await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Notice deleted successfully",
      noticeId: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Error deleting notice" });
  }
});

module.exports = router;
