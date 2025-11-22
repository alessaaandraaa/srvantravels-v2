"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const images = [
  "/bg-images/bg1.jpg",
  "/bg-images/bg2.jpg",
  "/bg-images/bg3.jpg",
  "/bg-images/bg4.jpg",
  "/bg-images/bg5.jpg",
  "/bg-images/bg6.jpg",
  "/bg-images/bg7.jpg",
  "/bg-images/bg8.jpg",
  "/bg-images/bg9.jpg",
  "/bg-images/bg10.jpg",
];

export default function Register() {
  const [current, setCurrent] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Background Slideshow */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#00000099] to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-20">
        <div className="bg-[#FFFFFFE6] backdrop-blur-md p-12 rounded-3xl shadow-2xl w-[90%] sm:w-[28rem] md:w-[34rem] lg:w-[38rem] text-gray-800">
          <h1 className="text-3xl font-extrabold mb-3 text-[#36B9CB] text-center break-words">
            WELCOME TO SR VAN TRAVELS!
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5F6C75] mb-6 text-center">
            Register an account
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="p-3 sm:p-4 rounded-lg border border-[#79C6D180] focus:outline-none focus:ring-2 focus:ring-[#36B9CB] text-base bg-white/90 placeholder-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 sm:p-4 rounded-lg border border-[#79C6D180] focus:outline-none focus:ring-2 focus:ring-[#36B9CB] text-base bg-white/90 placeholder-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 sm:p-4 rounded-lg border border-[#79C6D180] focus:outline-none focus:ring-2 focus:ring-[#36B9CB] text-base bg-white/90 placeholder-gray-400"
            />

            <button className="mt-2 bg-[#F3B54D] hover:bg-[#e3a645] text-white font-bold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200 text-base">
              Register
            </button>
          </form>

          <p className="text-sm sm:text-base mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#36B9CB] hover:text-[#2aa3b3] font-semibold"
            >
              Log In
            </Link>
          </p>

          {errorMessage && (
            <p className="mt-3 text-center text-red-600 font-medium">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm">
        SR Van Travels © 2025
      </footer>
    </div>
  );
}
