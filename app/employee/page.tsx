"use client"
import { signOut } from "next-auth/react";

const Page = () => {
    return (
      <>
        <title>Employee | Home</title>
        <div>Employee page</div>
        <button onClick={() => signOut()} >Signout</button>
      </>
    );
  };
  
  export default Page;
  