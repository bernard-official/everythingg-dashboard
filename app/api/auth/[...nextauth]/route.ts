
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDataFromDB, getUserByEmailFromDB } from "@/services";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string }
        // console.log("details: ", email, password)
        // console.log("req email: ", req?.body?.email as string)
        // const getAll = await getDataFromDB()
        // const checkUser = await getUserByEmailFromDB(email)
        // console.log("checkUser: ", checkUser)
        // console.log("all: ", getAll)
        if (email !== "john@gmail.com" || password !== "1234") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
      },

    })
  ],
  secret: process.env.GITHUB_SECRET,
  debug: true
});

export { handler as GET, handler as POST };