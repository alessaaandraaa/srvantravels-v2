"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    console.log("Response: ", data);

    if (response.ok) {
      router.push("/login");
    } else {
      setErrorMessage("Registration failed.");
      console.error("Registration failed.");
    }
  };

  return (
    <>
      <div id="register">
        <h1>WELCOME TO SR VAN TRAVELS!</h1>
        <hr />
        <h1>REGISTER AN ACCOUNT</h1>
        <form id="registerForm" onSubmit={onSubmit} noValidate>
          <div className="form-control">
            <label htmlFor="name">Username:</label>
            <input type="text" name="name" id="name" placeholder="name" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="reg_password"
              placeholder="Password"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <button type="submit" className="hover:bg-gray-300 mt-5">
            Register
          </button>
        </form>
      </div>
      <p className="text-red-950"> {errorMessage} </p>
    </>
  );
}
