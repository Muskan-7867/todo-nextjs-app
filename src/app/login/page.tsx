"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (user.email && user.password) {
      setIsLoading(true);
      setMessage("");
  
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage("Login successful!");
          console.log("Token:", data.token); 
          localStorage.setItem('authToken', data.token); 
        } else {
          setMessage(data.error || "Login failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setMessage("Please enter both email and password.");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-600 text-sm">
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
