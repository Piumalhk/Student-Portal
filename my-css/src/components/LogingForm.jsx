import React from "react";

export default function LogingForm() {
  return (
    <div className="flex justify-center items-center mt-20  ">
      <form className="w-100 h-130 bg-blue-100 rounded-xl shadow-lg ">
        <h1 className="text-center mt-15 font-sans text-4xl font-semibold">
          Portal Login
        </h1>

        <div className="mt-10 flex-column items-center justify-center px-10">
      
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-80 px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-8  flex-column items-center justify-center px-10">
         
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border  bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-center mt-12">
            <button type="submit" className="w-80 h-10 bg-blue-600 hover:bg-blue-500 rounded-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">Login</button>
        </div>
  <div className="text-center mt-3">
    <span>or </span><br/>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Create Account
          </a>
        </div>
          <div className="text-center mt-15">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
