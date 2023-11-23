import User from "@/app/(models)/users"
import { NextRequest, NextResponse } from "next/server"

// TODO: Function to make call to mongodb to delete a user, if the user exists
export async function POST(req: NextRequest) {
  const user = await req.json()
  const updateUser = await User.findOneAndUpdate({ _id: user._id }, user, {
    returnOriginal: false
    })
  if (updateUser) {
    return new NextResponse(JSON.stringify({ user }), { status: 200 })
  }
  else if (!updateUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
  }
    return new NextResponse(JSON.stringify({ message: "Server Error" }), { status: 500 })

}