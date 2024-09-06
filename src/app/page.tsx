"use client";
import React, { useEffect } from "react";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import Navbar from "src/components/Navbar";
import Apptodo from "src/components/apptodo";
import Todos from "src/components/todos";

const Home: React.FC = () => {
  const { isAuthenticated, loading, user, isVerified } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!isVerified) {
   
        alert("Your email is not verified. Please check your inbox for the verification email.");
        router.push("/login"); 
      }
    }
  }, [loading, isAuthenticated, isVerified, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!isVerified) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Your email is not verified. Please check your inbox for the verification email.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
