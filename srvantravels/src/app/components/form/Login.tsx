"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    console.log(data);
    if (data?.error) {
      setErrorMessage("Login failed");
      console.log("Error");
      console.log(data.error);
    } else {
      console.log("Success");
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-left min-h-screen bg-gray-100">
      <div
        id="login"
        className="bg-white p-8 rounded-2xl shadow-lg w-full min-h-screenliiiiikmax-w-sm"
      >
        <h1 className="text-xl font-bold text-center mb-2">
          WELCOME TO SR VAN TRAVELS!
        </h1>
        <hr className="mb-4" />
        <h1 className="text-lg font-semibold text-center mb-6">
          LOGIN TO YOUR ACCOUNT
        </h1>

        <form id="loginForm" onSubmit={onSubmit} className="space-y-4">
          <div className="form-control flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
