import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      HomePage
      <Link to="/Feedback">Go to Feedback Form</Link>
    </div>
  );
}
