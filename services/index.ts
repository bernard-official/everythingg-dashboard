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
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`)
  if (!response.ok) {
    return new NextResponse(JSON.stringify({ message: "Failed to get all users 🥹" }), {
      status: response.status
    })
  }
  return new NextResponse(JSON.stringify({ message: response.json() }), {
    status: response.status
  })
}

export const getUserByEmailFromDB = async (email: string) => {
  const response = await fetch("/api/userEmail", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" }
  })
  if (!response.ok) {
    throw new Error("Failed to get all users 🥹")
  }
  return response
}

export const changePasswordHandler = async (email: string, oldPassword: string, newPassword: string) => {
  const response = await fetch("/api/change-password", {
    method: "PATCH",
    body: JSON.stringify({ email, oldPassword, newPassword }),
    headers: { "Content-Type": "application/json" },
  })
  // console.log("response: ", response)
  return response
}