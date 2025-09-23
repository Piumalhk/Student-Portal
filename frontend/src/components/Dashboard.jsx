import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = ({ studentName }) => {
  // Sample data for the feedback chart
  const feedbackData = [
    { name: "Semester 1", submissions: 5 },
    { name: "Semester 2", submissions: 3 },
    { name: "Semester 3", submissions: 7 },
    { name: "Semester 4", submissions: 2 },
  ];

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

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Mid-Term Exam Schedule",
      date: "2025-09-30",
      summary:
        "Mid-term exams will start from October 15th. Check your schedule.",
      link: "/notices/1",
    },
    {
      id: 2,
      title: "Campus Maintenance",
      date: "2025-09-18",
      summary: "The library will be closed this weekend for maintenance.",
      link: "/notices/2",
    },
    {
      id: 3,
      title: "New Course Registration",
      date: "2025-09-15",
      summary: "Registration for elective courses is now open.",
      link: "/notices/3",
    },
  ];

  // Sample upcoming events data
  const events = [
    {
      id: 1,
      title: "Programming Assignment",
      course: "CS101",
      deadline: "2025-10-05",
      type: "assignment",
    },
    {
      id: 2,
      title: "Database Project Proposal",
      course: "CS301",
      deadline: "2025-10-12",
      type: "assignment",
    },
    {
      id: 3,
      title: "Technical Writing Report",
      course: "ENG105",
      deadline: "2025-09-25",
      type: "assignment",
    },
    {
      id: 4,
      title: "Annual Tech Fest",
      deadline: "2025-11-10",
      type: "event",
    },
  ];

  // Sample calendar events (for today)
  const todayEvents = [
    { time: "09:00 AM", title: "CS101 Lecture", location: "Room 201" },
    { time: "11:00 AM", title: "Study Group", location: "Library" },
    { time: "02:00 PM", title: "MATH201 Tutorial", location: "Room 305" },
  ];

  // Sample messages
  const messages = [
    {
      id: 1,
      from: "Dr. Johnson",
      subject: "Assignment Feedback",
      time: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      from: "Admin Office",
      subject: "Fee Payment Reminder",
      time: "Yesterday",
      read: true,
    },
  ];

  // Sort events by deadline (closest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

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
      </div>

      {/* Main Dashboard Grid with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content (Cards Grid) */}
        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feedback Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📊</span> Your Feedback
              Contributions
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={feedbackData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="submissions"
                    name="Feedback Submissions"
                    fill="#4f46e5"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/Feedback"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Submit New Feedback
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
          </div>

          {/* Notices / Announcements Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📢</span> Announcements
            </h2>
            <div className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <div
                  key={announcement.id}
                  className="border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-gray-800">
                      {announcement.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {announcement.summary}
                  </p>
                  <Link
                    to={announcement.link}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/notices"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Announcements
              </Link>
            </div>
          </div>

          {/* Events / Upcoming Deadlines Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📅</span> Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {sortedEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="flex p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div
                    className={`p-2 rounded-md mr-3 text-center min-w-16 ${
                      event.type === "assignment"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    <div className="text-xs font-medium">
                      {new Date(event.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs">
                      {new Date(event.deadline).getFullYear()}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    {event.course && (
                      <p className="text-xs text-gray-500">
                        Course: {event.course}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/calendar"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Full Calendar
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:w-1/4 space-y-8">
          {/* Mini Calendar Widget */}
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
            <div className="space-y-3">
              {todayEvents.map((event, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-3 py-1"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {event.time}
                  </p>
                  <p className="text-sm text-gray-700">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Widget */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📈</span> Attendance
            </h2>
            <div className="text-center mb-2 font-medium">87% Overall</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: "87%" }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-gray-500">Present</p>
                <p className="font-medium">26 days</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-gray-500">Absent</p>
                <p className="font-medium">4 days</p>
              </div>
            </div>
          </div>

          {/* Messages Widget */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-blue-500 mr-2">📨</span> Messages
            </h2>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">
                      {message.from}
                    </span>
                    {!message.read && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {message.subject}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/messages"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
