

import React, { FC } from "react";

import Navbar from "src/components/Navbar"; 
import Apptodo from "src/components/apptodo"; 
import Todos from "src/components/todos"; 
const Home: FC = () => {
  return (
    <div className=" min-h-screen"> 
     
      <main className="p-4 mt-8">
        <h1 className="text-4xl font-bold text-center text-black my-6">
          TODO NEXTJS + TYPESCRIPT
        </h1>
        <Navbar /> 
        <Apptodo /> 
        <Todos /> 
      </main>
    </div>
  );
};

export default Home;
