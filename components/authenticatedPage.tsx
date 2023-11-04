"use client";
import Loading from "@/app/loading";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export const AuthenticatedPage =  () => {
  const {data:session, status} = useSession()
  const router = useRouter()
  const handleSignOut = (event:React.MouseEvent<HTMLButtonElement>) =>{
    signOut()
  }
  
  return (
    <>
      <title>Admin | Home</title>
      <div>Admin page</div>
      <button onClick={handleSignOut}>Signout</button>
    </>
  );
};
