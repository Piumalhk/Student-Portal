import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ImageChanger from "../components/ImageChanger";

import { useAuth } from "../context/AuthContext"; // Import the hook


export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth(); // Get the login state
  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <NavBar />
    

      <Link to="/Feedback">Go to Feedback Form</Link>

    <div>
        <section className="absolute left-0 w-full h-90 bg-white flex items-center justify-center mt-100">
          <div className="w-300 h-50">
            <h1 className="text-black font-bold text-4xl text-center mt-4">
              Welcome to the Student Portal
            </h1>
            <br />
            <p className="text-black text-center text-lg">
              Your one-stop platform to access academic resources, submit
              assignments, check grades, and stay updated with university news.
            </p>
            <div className="flex items-center justify-center mt-6">
              {isLoggedIn ? (
                // Show Submit Feedback button when logged in
                <Link 
                  to="/Feedback" 
                  className="inline-block text-white bg-green-600 font-semibold px-6 py-3 rounded hover:bg-green-500 transition"
                >
                  Submit Feedback
                </Link>
              ) : (
                // Show Get Started button when not logged in
                <Link 
                  to="/Loging" 
                  className="inline-block text-white bg-blue-600 font-semibold px-6 py-3 rounded hover:bg-blue-500 transition"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

      <ImageChanger />

      <footer className="bg-gray-800 text-white text-center mt-190 h-20 absolute w-full left-0">
        <p>© 2025 Piumal Harshana | All rights reserved</p>
      </footer>
    </div>
  );
}
