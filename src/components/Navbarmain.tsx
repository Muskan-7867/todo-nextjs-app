"use client";
import React from 'react';
import Link from 'next/link';
import {  UserPlus ,  Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
      
        <Link href="/" className="text-white text-4xl font-bold">
          TodoApp
        </Link>

     
        <div className="flex items-center space-x-4 lg:space-x-8">
        
          <div className="lg:hidden flex items-center space-x-4">
            <Link href="/login" aria-label="Login">
              <Lock className="h-16 w-12 text-white hover:text-gray-300 transition-colors duration-200" />
            </Link>
            <Link href="/register" aria-label="Register">
              <UserPlus className="h-16 w-12 text-white hover:text-gray-300 transition-colors duration-200" />
            </Link>
          </div>

          
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link   href="/login">
              <button className="bg-white text-black  text-xl px-4 py-2 rounded-full   hover:bg-gray-100 ">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-white text-xl text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
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
