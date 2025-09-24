const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Notice = require("../models/Notice");

// Get admin dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    // Get counts
    const userCount = await User.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    const noticeCount = await Notice.countDocuments();

    // Get recent feedback
    const recentFeedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "username email");

    // Get recent notices
    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      counts: {
        users: userCount,
        feedback: feedbackCount,
        notices: noticeCount,
      },
      recentFeedback,
      recentNotices,
    });
  } catch (error) {
    console.error("Error getting admin dashboard summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify admin credentials
const verifyAdmin = async (req, res) => {
  try {
    // The user is already verified as admin by the middleware
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Error verifying admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboardSummary,
  verifyAdmin,
};
