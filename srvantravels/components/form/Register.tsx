"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/login");
    } else {
      setErrorMessage("Registration failed.");
      console.error("Registration failed.");
    }
  };

  return (
    <>
      <div
        id="register"
        className="flex items-center justify-start min-h-screen bg-gray-100"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full p-8 min-h-screen max-w-sm text-center">
          <h1 className="text-xl font-bold mb-4">WELCOME TO SR VAN TRAVELS!</h1>
          <h2 className="text-lg font-semibold mb-6">REGISTER AN ACCOUNT</h2>
          <form
            id="registerForm"
            onSubmit={onSubmit}
            noValidate
            className="space-y-4 text-left"
          >
            <div className="form-control">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-control">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                id="reg_password"
                placeholder="Password"
              />
            </div>
            <div className="form-control">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </form>
          <Link href="/login" className="hover:bg-amber-200">
            Already have an account?
          </Link>
        </div>
      </div>
      <p className="text-red-950"> {errorMessage} </p>
    </>
  );
}
