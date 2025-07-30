import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import ProtectedRoute from './component/ProtectedRoute';
import StudentCard from './component/StudentCard';
import { FaUserCircle } from 'react-icons/fa';
import logo from './bg1.png';

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

function StudentsPage() {
  const navigate = useNavigate();
  const email = localStorage.getItem("token") || "User";
  const name = email.split("@")[0];
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(`students_${email}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    department: '',
  });

  const [selectedColor, setSelectedColor] = useState('bg-blue-200');

  const colorOptions = [
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-pink-200',
    'bg-purple-200',
    'bg-indigo-200',
    'bg-red-200',
    'bg-gray-200',
    'bg-teal-200',
    'bg-orange-200'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.rollNo && newStudent.department) {
      const updatedStudents = [...students, { ...newStudent, color: selectedColor }];
      setStudents(updatedStudents);
      localStorage.setItem(`students_${email}`, JSON.stringify(updatedStudents));
      setNewStudent({ name: '', rollNo: '', department: '' });
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 relative p-6'>

      {/* User Dropdown */}
      <div className="absolute top-4 right-6 z-50 text-black">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 bg-white text-cyan-900 px-4 py-2 rounded hover:bg-gray-100 shadow-md"
          >
            <FaUserCircle className="text-2xl" />
            <span>{name}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <h1 className='text-center text-4xl font-bold text-purple-800 mt-4'>Student Records</h1>

      <div className='flex flex-col lg:flex-row mt-6'>

        {/* Color Picker */}
        <div className='w-full lg:w-1/6 mb-6 lg:mb-0'>
          <h3 className='text-gray-800 mb-4 text-md font-bold'>Choose Color</h3>
          <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-3'>
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`h-10 w-20 rounded-md cursor-pointer border-2 ${color} ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Input + Cards */}
        <div className='flex-1'>
          <div className='mb-6 flex flex-wrap gap-4 items-center'>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto' />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              value={newStudent.rollNo}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto' />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newStudent.department}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto' />
            <button
              onClick={addStudent}
              className='bg-cyan-900 text-white px-6 py-3 rounded-md hover:bg-cyan-700'
            >
              Add Student
            </button>
          </div>

          <div className='flex flex-wrap justify-center'>
            {students.map((student, index) => (
              <StudentCard
                key={index}
                student={student}
                color={student.color}
              />
            ))}
          </div>
        </div>
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
