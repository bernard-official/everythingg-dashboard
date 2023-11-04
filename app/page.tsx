"use client"
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Home() {
  const {data:session,status} = useSession()
  const router = useRouter()
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  })

  const {email,password} = userForm

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target
    setUserForm({
      ...userForm,[name]:value
    })

  }
  
  
  const handleSignIn = (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    signIn()
  }
  
  const handleSignInCred = (event:React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    signIn("credentials",{
      email,
      password,
      redirect:false

    })
  }
  
  if(!session){
    return (
      <div className="h-[100vh] flex  text-white w-full bg-gradient-to-r from-[#131516] to-50% to-[#080808] from-50% p-10 ">
        {/* Left side */}
        <div className="border border-red-500 w-[50%] h-[100%] flex flex-col justify-between">
          {/* Top details */}
          <div className="flex m-3 space-x-1">
            <span className="h-fit py-2 px-0.5">Logo</span>
            <span className="h-fit py-2 px-0.5">name of company</span>
          </div>
  
          {/* Bottom details */}
          <div>
            <p className="w-[100%] text-lg">
              Acme Inc “This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.”
            </p>
            <small className="text-md">Ben</small>
          </div>
        </div>
  
        {/* Right Side */}
        <div className="border border-red-500 w-[50%] h-[100%] flex flex-col">
          <div className="flex justify-end w-full">
            <button className="flex w-fit m-3 hover:bg-gray-600 px-3 py-1 rounded-md justify-end">
              Login
            </button>
          </div>
  
          <div className="mx-auto h-[70%] w-[80%] border border-red-500 flex flex-col my-auto justify-center">
  
            <div className="flex flex-col space-y-2 items-center justify-center border border-red-500 mb-3">
              <p className=" font-semibold text-xl ">Create an account</p>
              <p className="text-sm" >Enter your email below to create your account</p>
            </div>
            <form className="flex flex-col space-y-4 items-center justify-center">
              <input
                type="email"
                placeholder="email"
                className="flex w-[60%] items-center justify-center text-black"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="password"
                className="flex w-[60%] items-center justify-center text-black"
              />
              <button onClick={handleSignInCred} className="flex w-[60%] items-center justify-center border border-white/30">SignIn in email</button>
  
  
              <div>OR CONTINUE WITH</div>
              <button onClick={handleSignIn} className="flex w-[60%] items-center justify-center border border-white/30 cursor-pointer p-2 hover:bg-gray-600">Github</button>
            </form>
            <span className="mt-10 flex flex-col items-center justify-center text-sm space-y-0.5">
              <span>By clicking continue, you agree to our</span>
              <span> <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy.</span></span>
            </span>
              </div>
        </div>
      </div>
    );
  }
  redirect("/admin")
}
