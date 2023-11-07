"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import DashboardPage from "@/components/dashboard/dashboard";
import Loading from "../loading";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";
import { getDataFromDB } from "@/services";

const Page = () => {
  const { data: session, status } = useSession();
  const { users, setUsers } = useGlobalContext();
  // useEffect(() => {
  //   async () => {
  //     const allUsersFromDB = await getDataFromDB();
  //     const data = (await allUsersFromDB.json())["getAllUsers"];
  //     console.log("data: ", data);
  //     setUsers(data);
  //   };
  // }, [users]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session && status === "unauthenticated") {
    redirect("/");
  }
  return (
    <>
      <title>Admin | Home</title>
      <DashboardPage />
    </>
  );
};

export default Page;
