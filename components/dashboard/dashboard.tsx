"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "./date-range-picker";
import { MainNav } from "./main-nav";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { allUsers } from "@/consts";
import { useGlobalContext } from "@/context/store";
import { useEffect } from "react";
import { getDataFromDB } from "@/services";
import { Employee, User } from "@/types";
import UserSignupForm from "../userSignupForm";
import EmployeeSignupForm from "../employeeSignupForm";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// };

export default function DashboardPage({ data }: { data: User[] }) {
  const { users, setUsers } = useGlobalContext();

  // console.log("hmmm: ", users);
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
            <div className="ml-auto flex items-center space-x-4">
              <Search placeholder="Search..." />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          
          <Tabs defaultValue="overview" className="space-y-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="UserSignupForm">User Signup</TabsTrigger>  */}
              <TabsTrigger value="UserSignupForm">Employee Signup</TabsTrigger> 
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total employees
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {data?.length || 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Company Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales data={data} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="UserSignupForm" className="space-y-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>SignUp new Employees</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <EmployeeSignupForm /> */}
                  <UserSignupForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
