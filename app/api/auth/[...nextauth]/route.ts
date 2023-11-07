
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/types";

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

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`)
        const getAllUsers = await response.json()
        const filterEmail = getAllUsers["getAllUsers"].filter((user: User) => user.email === email && user.password === password)[0]
        if (filterEmail.length === 0) {
          throw new Error("User not available");
        }
        return filterEmail
      },

    })
  ],
  secret: process.env.GITHUB_SECRET,
  debug: true
});

export { handler as GET, handler as POST };