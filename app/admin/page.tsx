"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Loading from "../loading";

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    signOut();
  };
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <title>Admin | Home</title>
      <div>Admin page</div>
      <button onClick={handleSignOut}>Signout</button>
    </>
  );
};

export default Admin;
