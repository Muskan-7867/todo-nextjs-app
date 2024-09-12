"use client";
import React from "react";

import Addtodo from "src/components/Addtodo";
import Navbar from "src/components/Navbar";

import TodoList from "src/components/Todos";



const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 mt-8 text-black">
       <Navbar />
        <Addtodo />
        <TodoList />
        
      </main>
    </div>
  );
};

export default Home;
