import React from "react";
import Navbar from "../components/Navbar"; // Adjust the path as necessary
import Apptodo from "@/components/apptodo";
import Todos from "@/components/todos";
import './globals.css'

const Home = () => {
  return (
    <div>
      
      <main>
        
        <h1>TODO NEXTJS + TYPESCRIPT</h1>
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
