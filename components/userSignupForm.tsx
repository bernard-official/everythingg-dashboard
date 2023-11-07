"use client";
import React, { useState } from "react";
import { Button, Input, Label } from "./ui";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/store";
import { sendDataToDB } from "@/services";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// const createUser = aysnc( email, password) => {
//   const response = await fetch('api/auth/signup',{
//     method:'POST',
//     body: JSON.stringify({ email, password}),
//     headers:{
//       'Content-type': 'application/json'
//     }
//   })

//   if(!response.ok){
//     throw new Error(data.message || "something went wrong!")
//   }

//   return data;
// }

const UserSignupForm = ({ className, ...props }: UserSignupFormProps) => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  let { users, setUsers } = useGlobalContext();

  const comparePasswords = () => {
    return password === confirmPassword;
  };

  const handlefirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFirstname(event.target.value);
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSurname(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comparePasswords()) {
      const newUser = { name: `${firstname} ${surname}`, email, password };
      setUsers([...users, newUser]);
      const data = await sendDataToDB(newUser);
      if (data.ok) {
        router.refresh();
        router.push("/");
        toast.success("User signed up successfully");
      }
    } else {
      toast.error("Passwords dont match");
    }
    setFirstname("");
    setSurname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
              placeholder="firstname"
              type="text"
              value={firstname}
              onChange={handlefirstnameChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Surname
            </Label>
            <Input
              id="surname"
              placeholder="surname"
              type="text"
              value={surname}
              onChange={handleSurnameChange}
            />
          </div>

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
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              value={password}
              id="password"
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              value={confirmPassword}
              placeholder="confirm password"
              id="confirmPassword"
              type="confirmPassword"
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default UserSignupForm;
