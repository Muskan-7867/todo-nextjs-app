"use client";
import React from "react";

import Apptodo from "src/components/apptodo";
import TodoList from "src/components/todos";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="p-4 mt-8">
        <h1 className="text-4xl font-bold text-center text-black my-6">
          TODO NEXTJS + TYPESCRIPT
        </h1>
        {/* <Navbar /> */}
        <Apptodo />
        <TodoList />
      </main>
    </div>
  );
};

export default Home;
