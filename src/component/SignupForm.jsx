import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signupSchema from './signupSchema';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = (data) => {
     const existingUser = JSON.parse(localStorage.getItem(data.email));
      if (existingUser) {
          alert("Email is already registered!");
        } else {
            const userData = {
                Username: data.Username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            };
            localStorage.setItem(data.email, JSON.stringify(userData));
            alert(data.Username+ " has been successfully registered");
            localStorage.setItem("token", true);
            navigate ("/students");
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-3xl font-bold text-center text-gray-800 text-green-600 italic">Sign Up</h2>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 italic">Username</label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className={`mt-1 w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Enter username"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 italic">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`mt-1 w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 italic">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`mt-1 w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Enter password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 italic">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className={`mt-1 w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 italic hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm

