import NextAuth, { CredentialsSignin } from "next-auth"
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from "./app/utils/dbConnect"
import userModel from "./models/user.model"
import bcrypt from 'bcryptjs'
import axios from "axios"
import { redirect } from "next/navigation"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "PrepVault",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "yourname@example.com" },
        password: { label: "Password", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        
        if (!email || !password) {
          throw new Error("All fields are required");
        }

        try {
          await connectDB();
          const user = await userModel.findOne({ email });
          if (!user) {
            const response = await axios.post('http://localhost:3000/api/auth/signup', { email, password });
            if(response.data?.success){
              return { id: response.data.user._id, email: response.data.user.email };
              redirect('/home')
            }
          }

          const isValid = await bcrypt.compare(password, user.password?.toString() || "");
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return { id: user._id, email: user.email };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Error during authentication");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET
})