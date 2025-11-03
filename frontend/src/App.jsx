import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import HomePage from "./Pages/HomePage";
import LogingPage from "./Pages/LogingPage";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Loading from "./components/Loading";
import AdminSummary from "./Pages/AdminSummary";
import AdminLogin from "./components/AdminLogin";
import About from "./Pages/About";


function AppContent() {
  const { isLoading } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isLoading && <Loading />}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Feedback" element={<FeedbackForm />} />
          <Route path="/Loging" element={<LogingPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Summary" element={<AdminSummary />} />
          <Route path="/Admin" element={<AdminLogin />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
