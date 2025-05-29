import React from 'react'
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function () {
    const [loading, setLoading] = useState(true);
    
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
        <div className="flex justify-center items-center mt-20">
            <form className="w-100 h-140 bg-blue-100 rounded-xl shadow-lg p-8">
            <h1 className="text-center mt-4 font-sans text-4xl font-semibold">Sign Up</h1>
    
            <div className="mt-5">
                <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
    
            <div className="mt-5">
                <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
    
            <div className="mt-5">
                <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
             <div className="mt-5">
                <input
                type="password"
                id="password"
                placeholder="Confirm password"
                className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
    
            <div className="flex items-center justify-center mt-15">
                <button type="submit" className="w-full h-10 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold py-2 px-4 transition duration-200">Sign Up</button>
            </div>
    
            <div className="text-center mt-10">
                <span>Already have an account? </span>
                <a href="/Loging" className="text-sm text-blue-500 hover:text-blue-700">Login</a>
            </div>
            </form>
        </div>
    </div>
  )
}
