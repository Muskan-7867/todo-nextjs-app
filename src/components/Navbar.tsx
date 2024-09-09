"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const todosData: string | null = searchParams.get("todos");

  return (
    <nav className="flex space-x-4 mt-8   ">
      <Link   href="/" className={`${!todosData ? 'font-bold' : ''}`}>
        All
      </Link>
      <Link href="/?todos=active" className={`${todosData === 'active' ? 'font-bold' : ''}`}>
        Active
      </Link>
      <Link href="/?todos=completed" className={`${todosData === 'completed' ? 'font-bold' : ''}`}>
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
