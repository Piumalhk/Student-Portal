import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../components/Dashboard";
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

  // If logged in, show the dashboard
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="pt-20">
          <Dashboard studentName="Piumal" />
        </div>
      </div>
    );
  }

  // If not logged in, show the landing page
  return (
    <div>
      <NavBar />
 <ImageChanger />
      <div className="pt-100">
        <section className="w-full min-h-[350px] bg-white flex items-center justify-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-black font-bold text-4xl md:text-5xl text-center mt-8">
              Welcome to the Student Portal
            </h1>
            <br />
            <p className="text-black text-center text-lg md:text-xl">
              Your one-stop platform to access academic resources, submit
              assignments, check grades, and stay updated with university news.
            </p>
            <div className="flex items-center justify-center mt-8">
              <Link
                to="/Loging"
                className="inline-block text-white bg-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </div>

     

      <footer className="bg-gray-800 text-white text-center py-6 mt-20 w-100%">
        <p>© 2025 Piumal Harshana | All rights reserved</p>
      </footer>
    </div>
  );
}
