import React from "react";


export default function FeedbackForm() {
  return (
    <div>
      {" "}
      <form className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
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
    </div>
  );
}
