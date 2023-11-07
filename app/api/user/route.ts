import User from "@/app/(models)/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await User.create(body)
    console.log("body: ", body)
    return new NextResponse(JSON.stringify({ message: "User created" }), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  }
}

export async function GET() {
  try {
    const getAllUsers = await User.find()
    return new NextResponse(JSON.stringify({ getAllUsers }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  }
}