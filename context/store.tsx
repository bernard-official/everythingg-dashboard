"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { getDataFromDB } from "@/services";

interface ContextProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const GlobalContext = createContext<ContextProps>({
  users: [],
  setUsers: (): User[] => [],
});

export const GlobalContextProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<User[]>([]);

  // const updateData = async () => {
  //   const response = await fetch("/api/user");
  //   const json = await response.json();
  //   setUsers(json["getAllUsers"]);
  // };

  // const tt = updateData();
  // console.log("t: ",tt)
  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
