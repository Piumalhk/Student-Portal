import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../assets/background.jpg";

export default function FeedbackForm() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    priority: "medium",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login to submit feedback");
        setSubmitting(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        setFormData({
          title: "",
          description: "",
          category: "other",
          priority: "medium",
        });
        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("An error occurred while submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div
      className="absolute w-full left-0 min-h-screen py-12 px-4 "
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content (will stay fully opaque) */}
      <div className="relative z-10">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-30 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Submit Your Feedback
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Feedback title..."
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            rows="4"
            placeholder="Write your feedback..."
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          >
            <option value="other">Other</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="question">Question</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="critical">Critical</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
        <Link to={"/"}>Go Back to Home</Link>
        <Link to={"/Summary"}>Go Back to Summary</Link>
      </div>
    </div>
  );
}
