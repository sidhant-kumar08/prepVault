"use client";

import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

 

  async function handleCredentialsLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    try {
      const response = await signIn("credentials", { email, password, redirect: false });

      if (response?.error) {
        console.log(response?.error)
        setError("Invalid credentials try again");
      } else {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong");
    }
  }

  return (
    <form className="flex justify-center items-center mt-14 h-96" onSubmit={handleCredentialsLogin}>
      <div className="border-neutral-500 border rounded-2xl justify-center flex items-center px-10 md:px-16 py-8 flex-col gap-4 max-w-96">
        <h1 className="text-2xl font-semibold">Login to PrepVault</h1>

        {error && <p className="text-red-500 md:text-nowrap">{error}</p>}

        <div className="flex flex-col gap-2">
          <input
            className="border rounded-lg py-1 px-4"
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-lg py-1 px-4"
            type="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-20 py-2 rounded-lg">
          Login
        </button>

        <button
          type="button"
          onClick={() => signIn("github")}
          className="bg-black text-white flex gap-2 items-center rounded-lg px-6 py-2"
        >
          Login with Github <BsGithub />
        </button>
      </div>
    </form>
  );
}

export default Page;
