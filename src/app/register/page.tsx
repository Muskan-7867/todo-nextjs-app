"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
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

  const handleRegister = async () => {
    if (user.username && user.email && user.password) {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Registration successful! You can now log in.");
        } else {
          setMessage(data.error || "Registration failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
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
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-600 text-sm">
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
