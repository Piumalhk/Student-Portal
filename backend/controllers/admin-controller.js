const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Notice = require("../models/Notice");
const Schedule = require("../models/Schedule");
const Announcement = require("../models/Announcement");

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

// Feedback Management Functions
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("userId", "username email");

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Schedule Management Functions
const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find()
      .populate("createdBy", "username")
      .sort({ time: 1 });

    res.status(200).json({ schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addScheduleItem = async (req, res) => {
  try {
    const { time, title, location } = req.body;
    const createdBy = req.admin.id;

    const scheduleItem = new Schedule({
      time,
      title,
      location,
      createdBy,
    });

    await scheduleItem.save();
    await scheduleItem.populate("createdBy", "username");

    res.status(201).json({ scheduleItem });
  } catch (error) {
    console.error("Error adding schedule item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteScheduleItem = async (req, res) => {
  try {
    const { id } = req.params;

    const scheduleItem = await Schedule.findByIdAndDelete(id);

    if (!scheduleItem) {
      return res.status(404).json({ message: "Schedule item not found" });
    }

    res.status(200).json({ message: "Schedule item deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Announcements Management Functions
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const createdBy = req.admin.id;

    const announcement = new Announcement({
      title,
      content,
      priority,
      createdBy,
    });

    await announcement.save();
    await announcement.populate("createdBy", "username");

    res.status(201).json({ announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, priority, status } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { title, content, priority, status },
      { new: true }
    ).populate("createdBy", "username");

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ announcement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboardSummary,
  verifyAdmin,
  getAllFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  getSchedule,
  addScheduleItem,
  deleteScheduleItem,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
