"use client";

import { useState } from "react";
import Link from "next/link";
import SignOut from "./SignOut";
import { Menu, X, User } from "lucide-react";

export default function Navbar({ session }: { session: any }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="bg-[#36B9CB] border-b border-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* BRAND */}
          <Link href="/home" className="text-white font-extrabold text-lg">
            SRVAN Travels
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <Link href="/home" className="nav-link-main">Home</Link>
              <Link href="/packages" className="nav-link-main">Book Package</Link>
              <Link href="/itinerary" className="nav-link-main">Book Itinerary</Link>
              <Link href="/message" className="nav-link-main">Inbox</Link>
              <Link href="/help" className="nav-link-main">Help</Link>
              <Link href="/about" className="nav-link-main">About Us</Link>
            </div>

            {/* USER ACTIONS */}
            {session?.user && (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="
                    flex items-center gap-2
                    px-4 py-2 rounded-xl
                    bg-white/20 text-white text-sm font-semibold
                    hover:bg-white/30 transition
                  "
                >
                  <User size={16} />
                  {session.user.name}
                </Link>

                <SignOut className="signout-btn" />
              </div>
            )}

            {!session?.user && (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-[#F3B54D] text-white font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-6 pb-6 space-y-4">
            <Link href="/home" className="nav-link-main block">Home</Link>
            <Link href="/packages" className="nav-link-main block">Book Package</Link>
            <Link href="/itinerary" className="nav-link-main block">Book Itinerary</Link>
            <Link href="/message" className="nav-link-main block">Inbox</Link>
            <Link href="/help" className="nav-link-main block">Help</Link>
            <Link href="/about" className="nav-link-main block">About Us</Link>

            {session?.user && (
              <>
                <Link
                  href="/profile"
                  className="
                    flex items-center gap-2
                    px-4 py-2 rounded-xl
                    bg-white/20 text-white text-sm font-semibold
                  "
                >
                  <User size={16} />
                  Profile
                </Link>

                <SignOut className="signout-btn w-full" />
              </>
            )}

            {!session?.user && (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-[#F3B54D] text-white font-semibold block text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
