"use client";
import UserSignupForm from "@/components/user-signup-form";
import CustomForm from "@/components/customForm";

const Page = () => {
  return (
    <CustomForm isLogin={false}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <UserSignupForm />
    </CustomForm>
  );
};

export default Page;
