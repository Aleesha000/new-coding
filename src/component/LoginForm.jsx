import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from './loginSchema';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) {
      if (userData.password === data.password) {
        // alert(userData.Username + " you are successfully logged in!");
        // localStorage.setItem("token", true);
        localStorage.setItem("token", data.email);
        // localStorage.setItem("token", user.name);
        navigate("/students");
      } else {
        alert("Password is incorrect!");
      }
    } else {
      alert("Email or Password is incorrect!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-3xl font-bold text-center italic text-blue-600">Login</h2>

      <div>
        <label htmlFor="email" className="italic block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`mt-1 w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm italic font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={`mt-1 w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full italic bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm


