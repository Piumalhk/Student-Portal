import React from "react";
import { useState,useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import bgimage from "../assets/background.jpg";


export default function FeedbackForm() {
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
    <div  className="absolute w-full left-0 min-h-screen py-12 px-4 " 
      style={{ 
        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
 
      <form className="max-w-md mx-auto mt-30 bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Submit Your Feedback
        </h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          rows="4"
          placeholder="Write your feedback..."
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      <Link to={"/"}>Go Back to Home</Link>

      </div>
   
  );
}
