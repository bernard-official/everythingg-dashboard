"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "../loading";

const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  if (!session && status === "unauthenticated") {
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
  