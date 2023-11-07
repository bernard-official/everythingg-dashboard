"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allUsers } from "@/consts";
import { getAbbreviation } from "@/lib/utils";
import { User } from "@/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/store";

export function RecentSales() {
  const { users, setUsers } = useGlobalContext();
  // const [allData, setAllData] = useState<User[]>(allUsers);

  // useEffect(() => {
  //   console.log("everyone: ", allData);
  // }, [allData, setAllData]);

  const removeUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    userEmail: string
  ) => {
    e.preventDefault();
    const updatedData = users.filter((user) => user.email !== userEmail);
    setUsers(updatedData);
  };
  return (
    <div className="space-y-8">
      {users.map((user: User, index: number) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{getAbbreviation(user.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto flex space-x-4 items-center">
            <div className="font-medium">+${32 * index}</div>
            <Button
              onClick={(e) => removeUser(e, user.email)}
              className="bg-red-500 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
