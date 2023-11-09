"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "../loading";
import TaskPage from "@/components/task/task";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { changePasswordHandler } from "@/services";
import { UserNav } from "@/components/task/user-nav";

const Page = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePasswordHandler(
      session?.user?.email as string,
      oldPassword,
      newPassword
    );
  };

  return (
    <>
      <title>Employee | Home</title>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Task (todo list)</TabsTrigger>
          <TabsTrigger value="password">Update Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">
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
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
