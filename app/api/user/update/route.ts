import User from "@/app/(models)/users"
import { NextRequest, NextResponse } from "next/server"

// TODO: Function to make call to mongodb to delete a user, if the user exists
export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json()
    const updateUser = await User.findOneAndUpdate({ _id: user._id }, { user }, {
      new: true
    })
    if (!updateUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
    }
    return new NextResponse(JSON.stringify({ user }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  }
}