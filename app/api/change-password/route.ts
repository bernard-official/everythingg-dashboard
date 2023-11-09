import User from "@/app/(models)/users"
import { hash } from "bcrypt";
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from "next/server"
// export const revalidate = 0;
export async function PATCH(request: NextRequest) {
  // const { email, password } = req.body
  const userData = (await request)
  const responseData = await userData.json()
  try {
    const findUser = await User.findOne({ email: responseData.email })
    const newHash = await hash(responseData.newPassword, 10)
    const res = await User.updateOne({ _id: findUser._id }, { $set: { password: newHash } })
    return new NextResponse(JSON.stringify({ res }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  }
}