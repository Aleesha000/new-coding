import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import ProtectedRoute from './component/ProtectedRoute';
import StudentCard from './component/StudentCard';
import { FaUserCircle } from 'react-icons/fa';
import logo from './bg1.png';
import { useState,useEffect } from 'react';
import StudentsPage from './component/StudentPage';

function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100 mr-12 p-4">
      <h1><img src={logo} alt="Logo" /></h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl italic font-bold text-center text-gray-800 mb-6">
          {showLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {showLogin ? <LoginForm /> : <SignupForm />}

        <p className="text-center mt-6 italic text-sm text-gray-600">
          {showLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="text-blue-600 italic font-medium hover:underline ml-1"
          >
            {showLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
