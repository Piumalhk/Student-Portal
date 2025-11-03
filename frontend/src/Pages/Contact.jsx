import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import Loading from "../components/Loading";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };
 const [loading, setLoading] = useState(true);
  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mt-10 bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        {loading && <Loading />}
        <NavBar />
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have any questions or feedback? Feel free to reach out to us!
        </p>

        {submitted ? (
          <div className="text-center text-green-600 font-semibold">
            ✅ Thank you for your message! We’ll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-all font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
