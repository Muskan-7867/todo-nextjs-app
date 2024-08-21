"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({
   
    email: "",
    password: "",
  });

  const handleChange = () => {
   
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <div className="mb-4">
         
         
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Login
        </button>
        <p className="mt-4 text-gray-600 text-sm">
         Don,t have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
