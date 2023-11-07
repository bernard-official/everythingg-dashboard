import User from "@/app/(models)/users";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const email = await req.json()
    console.log("email received: ", email)
    const getAllUsers = User.find()
    const findUser = (await getAllUsers).filter(user => user.email === email)
    console.log("users found: ", findUser)
    return new NextResponse(JSON.stringify({ message: "User created" }), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 401 })
  }
}