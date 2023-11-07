import { User } from "@/types";
import { NextResponse } from "next/server";

export const sendDataToDB = async (user: User) => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" }
  })
  if (!response.ok) {
    throw new Error("Failed to create user 🥹")
  }
  return response
}

export const getDataFromDB = async () => {
  const response = await fetch("/api/user", {
    headers: { "Content-Type": "application/json" }
  })
  if (!response.ok) {
    throw new Error("Failed to get all users 🥹")
  }
  return response
}