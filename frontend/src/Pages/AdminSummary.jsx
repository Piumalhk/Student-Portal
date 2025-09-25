import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function AdminSummary() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState("feedback");

  // Form states
  const [newSchedule, setNewSchedule] = useState({
    time: "",
    title: "",
    location: "",
  });
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "normal",
  });

  const navigate = useNavigate();
  // Check if admin is authenticated
  useEffect(() => {
    const checkAdminAuth = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        console.log("No admin token found, redirecting to admin login");
        navigate("/admin");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin-auth/profile",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (!response.ok) {
          console.log("Invalid admin token, redirecting to admin login");
          localStorage.removeItem("adminToken");
          navigate("/admin");
          return;
        }

        const data = await response.json();
        console.log("Admin authenticated:", data);
        setAdminData(data.admin);
      } catch (error) {
        console.error("Error verifying admin token:", error);
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    };
    checkAdminAuth();
  }, [navigate]);
  // Admin management functions
  const handleFeedbackStatusChange = async (feedbackId, newStatus) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/feedback/${feedbackId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status:
              newStatus === "unread"
                ? "pending"
                : newStatus === "read"
                ? "in-progress"
                : "resolved",
          }),
        }
      );

      if (response.ok) {
        setFeedbackData((prev) =>
          prev.map((feedback) =>
            feedback.id === feedbackId
              ? { ...feedback, status: newStatus }
              : feedback
          )
        );
      }
    } catch (error) {
      console.error("Error updating feedback status:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:5000/api/admin/feedback/${feedbackId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.ok) {
          setFeedbackData((prev) =>
            prev.filter((feedback) => feedback.id !== feedbackId)
          );
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (newSchedule.time && newSchedule.title && newSchedule.location) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          "http://localhost:5000/api/admin/schedule",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSchedule),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const schedule = {
            id: result.scheduleItem._id,
            time: result.scheduleItem.time,
            title: result.scheduleItem.title,
            location: result.scheduleItem.location,
          };
          setScheduleData((prev) => [...prev, schedule]);
          setNewSchedule({ time: "", title: "", location: "" });
        }
      } catch (error) {
        console.error("Error adding schedule:", error);
      }
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm("Are you sure you want to delete this schedule item?")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:5000/api/admin/schedule/${scheduleId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.ok) {
          setScheduleData((prev) =>
            prev.filter((schedule) => schedule.id !== scheduleId)
          );
        }
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          "http://localhost:5000/api/admin/announcements",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnnouncement),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const announcement = {
            id: result.announcement._id,
            title: result.announcement.title,
            content: result.announcement.content,
            priority: result.announcement.priority,
            date: new Date(result.announcement.createdAt)
              .toISOString()
              .split("T")[0],
            status: result.announcement.status,
          };
          setAnnouncements((prev) => [...prev, announcement]);
          setNewAnnouncement({ title: "", content: "", priority: "normal" });
        }
      } catch (error) {
        console.error("Error adding announcement:", error);
      }
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:5000/api/admin/announcements/${announcementId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.ok) {
          setAnnouncements((prev) =>
            prev.filter((announcement) => announcement.id !== announcementId)
          );
        }
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  const handleToggleAnnouncementStatus = async (announcementId) => {
    try {
      const announcement = announcements.find((a) => a.id === announcementId);
      const newStatus =
        announcement.status === "active" ? "inactive" : "active";

      const adminToken = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/announcements/${announcementId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...announcement, status: newStatus }),
        }
      );

      if (response.ok) {
        setAnnouncements((prev) =>
          prev.map((announcement) =>
            announcement.id === announcementId
              ? { ...announcement, status: newStatus }
              : announcement
          )
        );
      }
    } catch (error) {
      console.error("Error toggling announcement status:", error);
    }
  }; // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) return;

        const headers = {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        };

        // Load feedback data
        const feedbackResponse = await fetch(
          "http://localhost:5000/api/admin/feedback",
          { headers }
        );
        if (feedbackResponse.ok) {
          const feedbackResult = await feedbackResponse.json();
          setFeedbackData(
            feedbackResult.feedback.map((f) => ({
              id: f._id,
              studentName: f.userId?.username || "Unknown",
              department: f.category || "General",
              rating: Math.floor(Math.random() * 5) + 1, // Mock rating since feedback doesn't have rating
              date: new Date(f.createdAt).toISOString().split("T")[0],
              status:
                f.status === "pending"
                  ? "unread"
                  : f.status === "in-progress"
                  ? "read"
                  : "resolved",
              comment: f.description,
            }))
          );
        }

        // Load schedule data
        const scheduleResponse = await fetch(
          "http://localhost:5000/api/admin/schedule",
          { headers }
        );
        if (scheduleResponse.ok) {
          const scheduleResult = await scheduleResponse.json();
          setScheduleData(
            scheduleResult.schedule.map((s) => ({
              id: s._id,
              time: s.time,
              title: s.title,
              location: s.location,
            }))
          );
        }

        // Load announcements data
        const announcementsResponse = await fetch(
          "http://localhost:5000/api/admin/announcements",
          { headers }
        );
        if (announcementsResponse.ok) {
          const announcementsResult = await announcementsResponse.json();
          setAnnouncements(
            announcementsResult.announcements.map((a) => ({
              id: a._id,
              title: a.title,
              content: a.content,
              priority: a.priority,
              date: new Date(a.createdAt).toISOString().split("T")[0],
              status: a.status,
            }))
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading admin data:", error);
        setLoading(false);
      }
    };

    if (adminData) {
      loadData();
    }
  }, [adminData]);
  // Calculate statistics
  const unreadFeedback = feedbackData.filter(
    (f) => f.status === "unread"
  ).length;
  const totalFeedback = feedbackData.length;
  const averageRating =
    totalFeedback > 0
      ? (
          feedbackData.reduce((sum, item) => sum + item.rating, 0) /
          totalFeedback
        ).toFixed(1)
      : 0;
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-6 pt-10">
          {" "}
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Management Dashboard
          </h1>
          {adminData && (
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">
                Logged in as:{" "}
                <span className="font-semibold">{adminData.username}</span>
              </p>
              <p className="text-xs text-gray-500">
                Admin role: {adminData.role}
              </p>
            </div>
          )}
        </div>{" "}
        {/* Admin Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Admin Dashboard
            </h2>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Feedback
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalFeedback}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Unread Feedback
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {unreadFeedback}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {averageRating}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h8m-8 0a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Announcements
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {announcements.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("feedback")}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === "feedback"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📝 Manage Feedback
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === "schedule"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📅 Daily Schedule
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === "announcements"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📢 Announcements
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Feedback Management Tab */}
            {activeTab === "feedback" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Student Feedback Management
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Comment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {feedbackData.map((feedback) => (
                        <tr key={feedback.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {feedback.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {feedback.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {feedback.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={feedback.status}
                              onChange={(e) =>
                                handleFeedbackStatusChange(
                                  feedback.id,
                                  e.target.value
                                )
                              }
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                feedback.status === "unread"
                                  ? "bg-red-100 text-red-800"
                                  : feedback.status === "read"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              <option value="unread">Unread</option>
                              <option value="read">Read</option>
                              <option value="resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                            {feedback.comment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteFeedback(feedback.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Schedule Management Tab */}
            {activeTab === "schedule" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Daily Schedule Management
                  </h3>
                </div>

                {/* Add Schedule Form */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Add New Schedule Item
                  </h4>
                  <form
                    onSubmit={handleAddSchedule}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <input
                      type="time"
                      value={newSchedule.time}
                      onChange={(e) =>
                        setNewSchedule({ ...newSchedule, time: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Event Title"
                      value={newSchedule.title}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          title: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newSchedule.location}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          location: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Add Schedule
                    </button>
                  </form>
                </div>

                {/* Schedule List */}
                <div className="space-y-4">
                  {scheduleData.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {schedule.time}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {schedule.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {schedule.location}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements Management Tab */}
            {activeTab === "announcements" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Announcements Management
                  </h3>
                </div>

                {/* Add Announcement Form */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Create New Announcement
                  </h4>
                  <form onSubmit={handleAddAnnouncement} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Announcement Title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          title: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                    <textarea
                      placeholder="Announcement Content"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          content: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                      required
                    />
                    <div className="flex justify-between items-center">
                      <select
                        value={newAnnouncement.priority}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            priority: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="normal">Normal Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                      >
                        Create Announcement
                      </button>
                    </div>
                  </form>
                </div>

                {/* Announcements List */}
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">
                            {announcement.title}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              announcement.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : announcement.priority === "high"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {announcement.priority}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              announcement.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {announcement.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleToggleAnnouncementStatus(announcement.id)
                            }
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            {announcement.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAnnouncement(announcement.id)
                            }
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">
                        {announcement.content}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {announcement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
