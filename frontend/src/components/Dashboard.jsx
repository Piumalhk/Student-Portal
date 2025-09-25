import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ studentName }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample courses data
  const courses = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      semester: "Semester 1",
    },
    {
      id: 2,
      code: "MATH201",
      name: "Advanced Calculus",
      semester: "Semester 2",
    },
    {
      id: 3,
      code: "CS301",
      name: "Database Management Systems",
      semester: "Semester 3",
    },
    {
      id: 4,
      code: "ENG105",
      name: "Technical Writing",
      semester: "Semester 1",
    },
    {
      id: 5,
      code: "CS401",
      name: "Software Engineering",
      semester: "Semester 4",
    },
  ];

  // Fetch announcements and schedule from admin
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch announcements
        const announcementsResponse = await fetch(
          "http://localhost:5000/api/public/announcements"
        );
        if (announcementsResponse.ok) {
          const announcementsData = await announcementsResponse.json();
          // The API returns { announcements: [...] }, already filtered for active ones
          setAnnouncements(announcementsData.announcements || []);
        }

        // Fetch schedule
        const scheduleResponse = await fetch(
          "http://localhost:5000/api/public/schedule"
        );
        if (scheduleResponse.ok) {
          const scheduleDataResult = await scheduleResponse.json();
          // The API returns { schedule: [...] }
          setScheduleData(scheduleDataResult.schedule || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {studentName || "Student"} 👋
        </h1>
        <p className="text-blue-100 mb-6">
          Here's what's happening in your portal today
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/Feedback"
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <span className="mr-2">✅</span> Give Feedback
          </Link>
          <Link
            to="/courses"
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <span className="mr-2">📚</span> View Courses
          </Link>
          <Link
            to="/notices"
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <span className="mr-2">🔔</span> Check Notices
          </Link>
        </div>
      </div>{" "}
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Cards Grid) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">⚡</span> Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/Feedback"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5"
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
                <div>
                  <h3 className="font-medium text-gray-800">Give Feedback</h3>
                  <p className="text-sm text-gray-500">Share your thoughts</p>
                </div>
              </Link>
              <Link
                to="/courses"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
              >
                <div className="bg-green-100 text-green-600 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">View Courses</h3>
                  <p className="text-sm text-gray-500">Check course details</p>
                </div>
              </Link>
              <Link
                to="/notices"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
              >
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-md mr-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-5 5v-5zM11 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Check Notices</h3>
                  <p className="text-sm text-gray-500">View announcements</p>
                </div>
              </Link>
            </div>
          </div>
          {/* Courses Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📚</span> Your Courses
            </h2>
            <div className="space-y-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3 font-medium text-sm">
                    {course.code}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.semester}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/courses"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Courses ({courses.length})
              </Link>
            </div>
          </div>{" "}
          {/* Announcements Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📢</span> Latest
              Announcements
            </h2>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">
                  Loading announcements...
                </p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-5 5v-5zM11 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4z"
                  ></path>
                </svg>
                <p className="text-gray-500 text-sm mt-2">
                  No announcements yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement._id}
                    className="border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-800">
                        {announcement.title}
                      </h3>
                      <div className="flex items-center space-x-2">
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
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(
                            announcement.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {announcement.content.length > 100
                        ? `${announcement.content.substring(0, 100)}...`
                        : announcement.content}
                    </p>
                  </div>
                ))}
                {announcements.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link
                      to="/notices"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All Announcements ({announcements.length})
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Today's Schedule Widget */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📅</span> Today's Schedule
            </h2>
            <div className="text-sm text-center mb-3 text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-xs text-gray-500 mt-2">
                  Loading schedule...
                </p>
              </div>
            ) : scheduleData.length === 0 ? (
              <div className="text-center py-6">
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
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
                <p className="text-gray-500 text-xs mt-2">No schedule items</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scheduleData.map((schedule) => (
                  <div
                    key={schedule._id}
                    className="border-l-4 border-blue-500 pl-3 py-2"
                  >
                    {" "}
                    <p className="text-sm font-medium text-gray-800">
                      {schedule.time}
                    </p>
                    <p className="text-sm text-gray-700">{schedule.title}</p>
                    <p className="text-xs text-gray-500">{schedule.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
