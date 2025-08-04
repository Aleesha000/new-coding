import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection,addDoc,query,getDocs,doc,deleteDoc,updateDoc,} from "firebase/firestore";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function StudentPage() {
  const email = localStorage.getItem("token") || "User";
  const name = email.split("@")[0];
  const navigate = useNavigate();
  const auth = getAuth();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    department: '',
  });
  const [selectedColor, setSelectedColor] = useState('#bfdbfe');
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in!");
      return;
    }

    if (newStudent.name && newStudent.rollNo && newStudent.department) {
      const studentData = {
        ...newStudent,
        color: selectedColor,
        uid: user.uid,
        userEmail: user.email,
        timestamp: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, "users", user.uid, "students"), studentData);
        setStudents(prev => [...prev, { id: docRef.id, ...studentData, isEditing: false }]);
        setNewStudent({ name: '', rollNo: '', department: '' });
        setSelectedColor('#bfdbfe');
      } catch (error) {
        console.error("Error adding student:", error);
        alert("Failed to add student!");
      }
    }
  };

  const fetchStudents = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(collection(db, "users", user.uid, "students"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isEditing: false,
      }));
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const toggleEdit = (index, status) => {
    setStudents((prev) =>
      prev.map((student, i) =>
        i === index ? { ...student, isEditing: status } : student
      )
    );
  };

  const handleStudentChange = (index, field, value) => {
    setStudents((prev) =>
      prev.map((student, i) =>
        i === index ? { ...student, [field]: value } : student
      )
    );
  };

  const saveStudent = async (index) => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const student = students[index];
    try {
      const studentRef = doc(db, "users", user.uid, "students", student.id);
      await updateDoc(studentRef, {
        name: student.name,
        rollNo: student.rollNo,
        department: student.department,
        color: student.color,
      });

      setStudents((prev) =>
        prev.map((s, i) =>
          i === index ? { ...student, isEditing: false } : s
        )
      );
      toast.success("Student updated successfully");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student");
    }
  };

  const deleteStudent = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "students", id));
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast.success("Your note has been deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete the note");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchStudents();
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 relative p-6'>
      {/* Dropdown */}
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
           <h3 className='text-gray-800 mb-2 text-lg font-bold'>Pick Card Color:</h3>
           <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>

        {/* Input Form */}
        <div className='flex-1'>
          <div className='mb-6 flex flex-wrap gap-4 items-center'>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto'
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              value={newStudent.rollNo}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto'
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newStudent.department}
              onChange={handleInputChange}
              className='p-3 rounded-md border border-gray-300 w-full sm:w-auto'
            />
            <button
              onClick={addStudent}
              className='bg-cyan-900 text-white px-6 py-3 rounded-md hover:bg-cyan-700 cursor-pointer transition'
            >
              Add Student
            </button>
          </div>

          {/* Student Cards */}
          <div className='flex flex-wrap justify-center gap-4'>
            {students.map((student, index) => (
              <div
                key={student.id}
                className="p-4 rounded-lg shadow-md w-64"
                style={{ backgroundColor: student.color }}
              >
                {student.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleStudentChange(index, "name", e.target.value)}
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="text"
                      value={student.rollNo}
                      onChange={(e) => handleStudentChange(index, "rollNo", e.target.value)}
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="text"
                      value={student.department}
                      onChange={(e) => handleStudentChange(index, "department", e.target.value)}
                      className="w-full mb-2 p-2 rounded border"
                    />
                    <input
                      type="color"
                      value={student.color}
                      onChange={(e) => handleStudentChange(index, "color", e.target.value)}
                      className="w-full mb-2 h-10 rounded cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => saveStudent(index)}
                        className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEdit(index, false)}
                        className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{student.name}</h2>
                    <p>Roll No: {student.rollNo}</p>
                    <p>Dept: {student.department}</p>
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => toggleEdit(index, true)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-center"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      
    </div>
  );
}

export default StudentPage;
