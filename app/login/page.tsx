"use client";
import UserAuthForm from "@/components/userAuthForm";
import CustomForm from "@/components/customForm";

const Page = () => {
  return (
    <CustomForm isLogin={true}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login into your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <UserAuthForm />
    </CustomForm>
  );
};

export default Page;
