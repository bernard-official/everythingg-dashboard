"use client"
import { useEffect } from "react";
import { usePathname, redirect } from "next/navigation";

export default function Home() {
  const path = usePathname();
  useEffect(() => {
    if (path === "/") {
      redirect("/login");
    }
    redirect(path);
  }, []);

  return null;
}
