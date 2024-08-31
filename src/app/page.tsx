import React, { FC } from "react";
import Navbar from "../components/Navbar";
import Apptodo from "src/components/apptodo";
import Todos from "src/components/todos";

const Home:FC = () => {
  return (
    <div>
      
      <main>
        
        <h1 className="text-4xl text-black">TODO NEXTJS + TYPESCRIPT</h1>
        <br/><br/>
        <Navbar />
        <Apptodo />
        <Todos />
        {/* Additional content */}
      </main>
    </div>
  );
};

export default Home;
