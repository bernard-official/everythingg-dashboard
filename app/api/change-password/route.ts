import User from "@/app/(models)/users"
import { ObjectId } from 'bson';
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
  // const { email, password } = req.body
  const userData = (await request)
  const userEmail = await userData.json()
  const userNewPassword = userEmail.newPassword
  const userOldPassword = userEmail.oldPassword


  console.log("req json: ", userEmail)
  // console.log("req data: ", await request.method)
  const findUser = await User.findOne({ email: userEmail.email })
  const res = User.findOneAndUpdate({ _id: new ObjectId(findUser.id) }, { $set: { password: userEmail.newPassword } })

  // if (findUser) {
  //   console.log("after update: ", res)
  //   return new NextResponse(JSON.stringify({ message: "Update Successfully" }), { status: 200 })
  // }
  // try {
  //   const getAllUser = await User.find()
  //   const filterUser = getAllUser.filter(user => user.email === userEmail.email)[0]
  //   console.log("filter: ", filterUser)
  //   if (filterUser) {
  //     if (filterUser.password === userOldPassword) {
  //       // const newUserDetails = { ...filterUser, password: userNewPassword }
  //       // console.log("newUser: ", newUserDetails)
  //     }
  //   }
  // } catch (error) {
  //   return new NextResponse(JSON.stringify({ message: "Error: ", error }), { status: 500 })
  // }
}