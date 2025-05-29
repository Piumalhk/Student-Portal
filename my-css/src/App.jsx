import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import HomePage from "./Pages/HomePage";
import LogingPage from "./Pages/LogingPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Feedback" element={<FeedbackForm />} />
          <Route path="/Loging" element={<LogingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
