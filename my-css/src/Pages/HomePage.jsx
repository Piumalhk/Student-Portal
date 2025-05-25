import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function HomePage() {
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
      <NavBar/>
      HomePage <br/>
      <Link to="/Feedback">Go to Feedback Form</Link>
    </div>
  );
}
