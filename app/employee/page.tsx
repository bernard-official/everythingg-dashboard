"use client"
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Loading from "../loading";
import TaskPage from "@/components/task/task";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { changePasswordHandler } from "@/services";
import toast from "react-hot-toast";

const Page = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  if (!session && status === "unauthenticated") {
    redirect("/");
  }

  const changeOldPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOldPassword(event.target.value);
  };
  const changeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await changePasswordHandler(
      session?.user?.email as string,
      oldPassword,
      newPassword
    );
    if (result.status === 401) {
      toast.error("Wrong password");
    } else if (result.status === 200) {
      toast.success("Successfully changed password");
      setOldPassword("");
      setNewPassword("");
      router.push("/");
    } else if (result.status === 500) {
      toast.error("Error: password not changed😔");
    }

    console.log("result: ", result);
  };

  return (
    <>
      <title>Employee | Home</title>
      {/* <TaskPage />  */}
      <div className="flex justify-center">
        <form
          className="w-95 max-w-25rem mx-auto my-8"
          onSubmit={submitHandler}
        >
          <div className="mb-2">
            <Label
              className="font-bold mb-2 text-#353336 block"
              htmlFor="old-password"
            >
              Old Password
            </Label>
            <Input
              id="old-password"
              type="password"
              onChange={changeOldPassword}
              value={oldPassword}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div className="mb-2">
            <Label
              className="font-bold mb-2 text-#353336 block"
              htmlFor="new-password"
            >
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={changeNewPassword}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button>Change Password</Button>
        </form>
      </div>
    </>
  );
};
  
  export default Page;
  