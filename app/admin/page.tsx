"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import DashboardPage from "@/components/dashboard/dashboard";
import Loading from "../loading";
import { useGlobalContext } from "@/context/store";
import { useEffect, useState } from "react";
import { getDataFromDB } from "@/services";
import { User } from "@/types";

const Page = () => {
  const { data: session, status } = useSession();
  let [myUsers, setMyUsers] = useState<User[]>([]);

  useEffect(() => {
    let value: User[] = [];
    const url = "/api/user";

    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      value = json["getAllUsers"];
      setMyUsers(value);
    };
    fetchData();
    console.log("vals: ", myUsers);
  }, []);
  if (status === "loading") {
    return <Loading />;
  }

  if (!session && status === "unauthenticated") {
    redirect("/");
  }
  return (
    <>
      <title>Admin | Home</title>
      <DashboardPage data={myUsers} />
    </>
  );
};

export default Page;
