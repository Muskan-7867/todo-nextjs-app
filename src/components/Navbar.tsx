"use client"
import React from "react";
import Link from 'next/link'
import {  useSearchParams } from "next/navigation";

const Navbar = () => {
  const searchParams : ReadonlyURLSearchParams = useSearchParams();
  const todosData: string | null  = searchParams.get("todos");
  
  return (
    <nav>
      <Link href="/" className={todosData=== null ? "active" : ""}>
        All
      </Link>
      <Link href="/?todos=active" className={todosData === "active" ? "active" : ""}>
        Active
      </Link>
      <Link href="/?todos=completed" className={todosData=== "completed" ? "active" : ""}>
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
