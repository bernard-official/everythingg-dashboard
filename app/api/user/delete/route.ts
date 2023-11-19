import User from "@/app/(models)/users"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.json()
  const userId = data.userId

  try {
    const user = await User.findOneAndDelete({ _id: userId })

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
    }
    return new NextResponse(JSON.stringify({ user }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  }
}
