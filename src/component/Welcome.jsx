import React from "react";
import logo1 from "./bg2.jpg";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${logo1})` }}
    >
      <button
        onClick={logout}
        className="absolute top-4 right-4 z-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-center px-6 py-4 ">
        <h1 className="text-3xl font-bold italic text-green-600">
          Account Created Successfully!
        </h1>
        <p className="text-lg mt-2 text-gray-700">
          Welcome! You can now log in to your account.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
