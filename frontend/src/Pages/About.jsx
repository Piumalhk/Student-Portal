import React from "react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

export default function AboutUs() {
  
  return (
  
    <div className=" bg-gray-50 flex flex-col items-center py-12 px-6">
          <NavBar/>
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-700 mt-35">About Us</h1>
      <p className="text-gray-600 max-w-2xl text-center mt-5">
        Welcome to the Student Portal — a platform designed to simplify and
        enhance the academic experience of students. Our mission is to provide
        seamless access to academic resources, feedback systems, and student
        engagement tools.
      </p>

      {/* Mission Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mt-15">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          We aim to create a digital environment that connects students and
          faculty effectively, improves communication, and helps in continuous
          learning and improvement.
        </p>
      </div>

     

      {/* Footer */}
      <footer className="mt-31 text-gray-500 text-sm text-center h-1  border-gray-700 ">
        © {new Date().getFullYear()} Student Portal | All Rights Reserved
      </footer>

      
    </div>
    
  );
}
 