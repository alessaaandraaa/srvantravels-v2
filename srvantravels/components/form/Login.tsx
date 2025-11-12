"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD

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
=======
import { useState } from "react";
import Link from "next/link";
>>>>>>> fbb521d5e0220a205b8280599bfde8302fcb734e

export default function Login() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // background fade logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!data?.error) router.push("/home");
  };

  return (
<<<<<<< HEAD
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Background carousel */}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#00000099] to-transparent" />

      {/* Login container */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-20">
        <div className="animate-fadeInSlide bg-[#FFFFFFE6] backdrop-blur-md p-12 rounded-3xl shadow-2xl w-[90%] sm:w-[28rem] md:w-[34rem] lg:w-[38rem] text-gray-800 transform transition-all duration-700">
          {/* Title */}
          <h1 className="text-3xl font-extrabold mb-3 text-[#36B9CB] text-center whitespace-nowrap">
            WELCOME TO SR VAN TRAVELS!
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#5F6C75] mb-6 text-center">
            Log in to your account
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            <button
              className="mt-2 bg-[#F3B54D] hover:bg-[#e3a645] text-white font-bold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200 text-base"
            >
              Log In
            </button>
          </form>

          {/* Register text */}
          <p className="text-sm sm:text-base mt-4 text-gray-600 text-center">
            No account?{" "}
            <a
              href="/register"
              className="text-[#36B9CB] hover:text-[#2aa3b3] font-semibold"
            >
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#FFFFFF] text-xs sm:text-sm">
        SR Van Travels © 2025
      </footer>

      {/* Tailwind custom animation */}
      <style jsx global>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlide {
          animation: fadeInSlide 1s ease-out;
        }
      `}</style>
=======
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
>>>>>>> fbb521d5e0220a205b8280599bfde8302fcb734e
    </div>
  );
}
