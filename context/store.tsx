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
  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
