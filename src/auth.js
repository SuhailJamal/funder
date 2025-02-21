import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "na" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.User.findOne({
          where : {
            email : credentials.email
          }
        })
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
        if(!user.verified){
          throw new error("Verify your account first")
        }
        else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new error("No user found");
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        try {
          const existingUser = await prisma.User.findUnique({
            where: { email: user.email },
          });
  
          if (!existingUser) {
            await prisma.User.create({
              data: {
                email: user.email,
                name: user.name,
              },
            });
          }
          return true; // Allow sign-in
        } catch (e) {
          console.error("Error while connecting to the database:", e);
          return false; // Block sign-in on error
        }
      }
  
      return true; // Allow sign-in for other providers
    },
    async redirect({ url, baseUrl ,user }) {
      return `${baseUrl}/`;
    },
  },
  pages: {
    signIn: "/login"
  }
  
  
});
