"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: _, status } = useSession();
  if (status === "unauthenticated" || status === "loading") {
    redirect("/");
  }
  return (
    <>
      <title>Employee | Home</title>
      <div>Employee page</div>
      <button type="button" onClick={() => signOut()}>
        Signout
      </button>
    </>
  );
};
  
  export default Page;
  