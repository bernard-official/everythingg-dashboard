
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
          }),
          CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const {email,password} = credentials as {email:string,password:string}
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
    pages: {
        signIn: "auth/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
      },
    // pages: { signOut: "/"},// this enables authentication on the particular route
    
    secret: process.env.GITHUB_SECRET,
    debug: true
});

export { handler as GET, handler as POST };