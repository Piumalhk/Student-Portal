const express = require("express");
const verifyToken = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const Feedback = require("../models/Feedback");

const router = express.Router();

// Get all feedback - admin only
router.get("/", adminMiddleware, async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering options
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Sorting options
    let sort = { createdAt: -1 }; // Default sort by newest
    if (req.query.sort) {
      if (req.query.sort === "oldest") {
        sort = { createdAt: 1 };
      } else if (req.query.sort === "priority") {
        sort = { priority: -1, createdAt: -1 };
      }
    }

    // Get feedback with pagination, filtering, and sorting
    const feedback = await Feedback.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("userId", "username email");

    // Get total count for pagination
    const totalFeedback = await Feedback.countDocuments(filter);

    res.status(200).json({
      feedback,
      pagination: {
        total: totalFeedback,
        page,
        pages: Math.ceil(totalFeedback / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

// Get a specific feedback by ID - admin only
router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "userId",
      "username email"
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

// Submit new feedback - authenticated users only
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    // Create new feedback
    const newFeedback = new Feedback({
      userId: req.userId,
      title,
      description,
      category,
      priority: priority || "medium",
      status: "pending",
      createdAt: new Date(),
    });

    // Save to database
    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Error submitting feedback" });
  }
});

// Update feedback status - admin only
router.patch("/:id/status", adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Update status
    feedback.status = status;
    await feedback.save();

    res.status(200).json({
      message: "Feedback status updated successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res.status(500).json({ message: "Error updating feedback" });
  }
});

module.exports = router;
