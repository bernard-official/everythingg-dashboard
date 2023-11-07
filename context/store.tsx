"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { allUsers } from "@/consts";
import { getDataFromDB } from "@/services";

interface ContextProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const GlobalContext = createContext<ContextProps>({
  users: [],
  setUsers: (): User[] => [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   async () => {
  //     const allUsersFromDB = await getDataFromDB();
  //     console.log("ok: ", await allUsersFromDB);
  //   };
  // }, []);
  // const allUsers = await (await allUsersFromDB.json())["getAllUsers"];
  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
