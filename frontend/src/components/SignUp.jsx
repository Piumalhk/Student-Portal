import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await signup({
        username,
        email,
        password,
        confirmPassword,
      });
      if (result.success) {
        navigate("/"); // Redirect to home page on successful signup
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup. Please try again.");
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      {" "}
      <div className="flex justify-center items-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="w-100 h-140 bg-blue-100 rounded-xl shadow-lg p-8"
        >
          <h1 className="text-center mt-4 font-sans text-4xl font-semibold">
            Sign Up
          </h1>
          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
          <div className="mt-5">
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>{" "}
          <div className="mt-5">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-center mt-15">
            <button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold py-2 px-4 transition duration-200"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-10">
            <span>Already have an account? </span>
            <a
              href="/Loging"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
