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
import { Employee } from "../types";
import { getDataFromDB } from "@/services";

interface ContextProps {
  employees: Employee[];
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
}

const GlobalContext = createContext<ContextProps>({
  employees: [],
  setEmployees: (): Employee[] => [],
});

export const GlobalContextProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // const updateData = async () => {
  //   const response = await fetch("/api/user");
  //   const json = await response.json();
  //   setUsers(json["getAllUsers"]);
  // };

  // const tt = updateData();
  // console.log("t: ",tt)
  return (
    <GlobalContext.Provider value={{ employees, setEmployees }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
