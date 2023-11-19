import User from "@/app/(models)/users";
import { hash, compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json()
    let newBody = { ...body, password: await hash(body.password, 10) }
    await User.create(newBody)
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

// TODO: Function to make call to mongodb to update a user: This should work but might need tweaking
// export async function DELETE(req: NextRequest) {
//   const userId = await req.url.split("/")
//   return new NextResponse(JSON.stringify({ message: userId }))


//   // console.log("userID", userId)
//   // try {
//   //   const user = await User.findOneAndDelete({ _id: userId })
//   //   if (!user) {
//   //     return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
//   //   }
//   //   return new NextResponse(JSON.stringify({ user }), { status: 200 })
//   // } catch (error) {
//   //   return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
//   // }
// }


