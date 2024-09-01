"use client";
import React from 'react';
import Link from 'next/link';
import { UserIcon, KeyIcon } from '@heroicons/react/outline';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-4xl font-bold">
          TodoApp
        </Link>

        {/* Navbar Links */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Show icons on small screens */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link href="/login" aria-label="Login">
              <UserIcon className="h-16 w-12 text-white hover:text-gray-300 transition-colors duration-200" />
            </Link>
            <Link href="/register" aria-label="Register">
              <KeyIcon className="h-16 w-12 text-white hover:text-gray-300 transition-colors duration-200" />
            </Link>
          </div>

          {/* Show buttons on large screens */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/login">
              <button className="bg-white text-blue-600 text-xl px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-white text-xl text-blue-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
