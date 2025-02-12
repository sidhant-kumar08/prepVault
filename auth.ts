import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "PrepVault",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "yourname@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("All fields are required");
        }

        try {
          const { data } = await axios.post("http://localhost:3000/api/auth/signup", {
            email,
            password,
          });

          if (!data?.success) {
            throw new Error("Invalid credentials");
          }

          return { id: data.user._id, email: data.user.email };
        } catch (error) {
          throw new Error(
            error?.response?.data?.message || "An error occurred"
          );
        }
      },
    }),
  ],
  pages: {
    error: "/signin",
  },
  secret: process.env.AUTH_SECRET,
});
