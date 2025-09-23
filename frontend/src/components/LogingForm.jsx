import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirecting
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function LogingForm() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get the login function

  // Get the navigate function for redirection
  const navigate = useNavigate();

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate("/"); // Redirect to home page on successful login
      } else {
        setError(
          result.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-100 h-130 bg-blue-100 rounded-xl shadow-lg p-8"
      >
        <h1 className="text-center mb-8 font-sans text-4xl font-semibold">
          Portal Login
        </h1>

        {/* Show error message if any */}
        {error && (
          <div className="mb-4 text-center text-red-600 bg-red-100 py-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-6 flex-column items-center justify-center">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-8 flex-column items-center justify-center">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-80 h-10 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-200"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-3">
          <span>or </span>
          <br />
          <a
            href="/SignUp"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Create Account
          </a>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
