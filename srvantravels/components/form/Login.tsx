"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function Login() {
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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!data?.error) {
      router.push("/home");
    } else {
      setErrorMessage("Login Error: " + data?.error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
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

      <div className="absolute inset-0 bg-gradient-to-l from-[#00000099] to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-20">
        <div className="animate-fadeInSlide bg-[#FFFFFFE6] backdrop-blur-md p-12 rounded-3xl shadow-2xl w-[90%] sm:w-[28rem] md:w-[34rem] lg:w-[38rem] text-gray-800 transform transition-all duration-700">
          <h1 className="text-3xl font-extrabold mb-3 text-[#36B9CB] text-center break-words">
            WELCOME TO SR VAN TRAVELS!
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5F6C75] mb-6 text-center">
            Log in to your account
          </p>

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
            <button className="mt-2 bg-[#F3B54D] hover:bg-[#e3a645] text-white font-bold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200 text-base">
              Log In
            </button>
          </form>

          <p className="text-sm sm:text-base mt-4 text-gray-600 text-center">
            No account?{" "}
            <a
              href="/register"
              className="text-[#36B9CB] hover:text-[#2aa3b3] font-semibold"
            >
              Register
            </a>
          </p>

          {errorMessage && (
            <p className="mt-3 text-center text-red-600 font-medium">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#FFFFFF] text-xs sm:text-sm">
        SR Van Travels © 2025
      </footer>

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
    </div>
  );
}
