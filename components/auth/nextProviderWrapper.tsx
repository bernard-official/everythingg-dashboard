"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function NextAuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}){
  return <SessionProvider>{children}</SessionProvider>;
}