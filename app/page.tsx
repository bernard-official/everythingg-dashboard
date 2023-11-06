"use client"
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserAuthForm from "@/components/userAuthForm";

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn("absolute right-4 top-4 md:right-8 md:top-8")}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="h-[100vh] flex  text-white w-full bg-gradient-to-r from-[#131516] to-50% to-[#080808] from-50% p-10 ">
  //     {/* Left side */}
  //     <div className="border border-red-500 w-[50%] h-[100%] flex flex-col justify-between">
  //       {/* Top details */}
  //       <div className="flex m-3 space-x-1">
  //         <span className="h-fit py-2 px-0.5">Logo</span>
  //         <span className="h-fit py-2 px-0.5">name of company</span>
  //       </div>

  //       {/* Bottom details */}
  //       <div>
  //         <p className="w-[100%] text-lg">
  //           Acme Inc “This library has saved me countless hours of work and
  //           helped me deliver stunning designs to my clients faster than ever
  //           before.”
  //         </p>
  //         <small className="text-md">Ben</small>
  //       </div>
  //     </div>

  //     {/* Right Side */}
  //     <div className="border border-red-500 w-[50%] h-[100%] flex flex-col">
  //       <div className="flex justify-end w-full">
  //         <button className="flex w-fit m-3 hover:bg-gray-600 px-3 py-1 rounded-md justify-end">
  //           Login
  //         </button>
  //       </div>

  //       <div className="mx-auto h-[70%] w-[80%] border border-red-500 flex flex-col my-auto justify-center">
  //         <div className="flex flex-col space-y-2 items-center justify-center border border-red-500 mb-3">
  //           <p className=" font-semibold text-xl ">Create an account</p>
  //           <p className="text-sm">
  //             Enter your email below to create your account
  //           </p>
  //         </div>
  //         <form className="flex flex-col space-y-4 items-center justify-center">
  //           <input
  //             type="email"
  //             placeholder="email"
  //             className="flex w-[60%] items-center justify-center text-black"
  //           />
  //           <input
  //             type="password"
  //             placeholder="password"
  //             className="flex w-[60%] items-center justify-center text-black"
  //           />
  //           <button className="flex w-[60%] items-center justify-center border border-white/30">
  //             SignIn in email
  //           </button>

  //           <div>OR CONTINUE WITH</div>
  //           <button className="flex w-[60%] items-center justify-center border border-white/30 cursor-pointer p-2 hover:bg-gray-600">
  //             Github
  //           </button>
  //         </form>
  //         <span className="mt-10 flex flex-col items-center justify-center text-sm space-y-0.5">
  //           <span>By clicking continue, you agree to our</span>
  //           <span>
  //             {" "}
  //             <span className="underline">Terms of Service</span> and{" "}
  //             <span className="underline">Privacy Policy.</span>
  //           </span>
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );
}
