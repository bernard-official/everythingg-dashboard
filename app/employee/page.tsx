"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "../loading";
import TaskPage from "@/components/task/task";
import { useState } from "react";

const Page = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  if (!session && status === "unauthenticated") {
    redirect("/");
  }

  const changeOldPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  )=>{
    event.preventDefault();
    setOldPassword(event.target.value)
  }
  const changeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  )=>{
    event.preventDefault();
    setNewPassword(event.target.value)
  }

  const submitHandler =(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()

    const enteredOldPassword = oldPassword
    const enteredNewPassword = newPassword

  }

  return (
    <>
      <title>Employee | Home</title>
      <TaskPage />
      <div className="flex justify-center">
      <form className="w-95 max-w-25rem mx-auto my-8"  onSubmit={submitHandler}>
      <div className="mb-2">
        <label className="font-bold mb-2 text-#353336 block" htmlFor='new-password'>Old Password</label>
        <input className="block w-full p-1 bg-f7f0fa rounded-4 border border-#38015c" type='password' id='new-password' value={oldPassword} />
      </div>
      <div className="mb-2">
        <label className="font-bold mb-2 text-#353336 block" htmlFor='old-password'>New Password</label>
        <input className="block w-full p-1 bg-f7f0fa rounded-4 border border-#38015c" type='password' id='old-password' value={newPassword} />
      </div>
      <div className="mb-1">
        <button className="cursor-pointer py-2 px-6 rounded-4 bg-#0d0c0d text-black border border-#0d0c0d">Change Password</button>
      </div>
    </form>
      </div>
    </>
  );
};
  
  export default Page;
  