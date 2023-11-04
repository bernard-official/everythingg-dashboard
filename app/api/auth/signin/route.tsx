"use client"
import { signIn } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'

const Signin = () => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
      // validate your userinfo
      e.preventDefault();
      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });
  
      console.log(res);
    };
    return (
      <div className="sign-in-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            value={""}
            type="email"
            placeholder="john@email.com"
          />
          <input
            value={""}
            type="password"
            placeholder="********"
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
}

export default Signin