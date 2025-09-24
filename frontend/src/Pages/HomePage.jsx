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

      <footer className="bg-gray-800 text-white py-8 mt-20 w-100%">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-80 ">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-300">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-gray-400 ">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Notices
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Feedback
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-300">
                  Resources
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Academic Calendar
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Contact Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-300">
                  Connect
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-blue-300 transition duration-300"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 Student Portal | All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
