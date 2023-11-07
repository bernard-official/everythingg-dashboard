"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { getDataFromDB } from "@/services";
import { useGlobalContext } from "@/context/store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const { users, setUsers } = useGlobalContext();
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [userForm, setUserForm] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const refreshData = await getDataFromDB();
    const data2 = await (await refreshData.json())["getAllUsers"];
    console.log("data2", data2);

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    const data = await response;
    if (data?.status !== 200) {
      toast.error("☹️ User is unauthorized", { duration: 1000 });
    } else {
      toast.success("😊 User signed in successfully");
      router.push("/employee");
    }
  }

  const handleGithubAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signIn("github", { callbackUrl: "/admin" });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={handleEmailChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              value={password}
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <Button>Sign In with Email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button onClick={handleGithubAuth} variant="outline" type="button">
        Github
      </Button>
    </div>
  );
}
