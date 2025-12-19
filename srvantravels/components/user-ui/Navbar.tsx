import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="bg-[#36B9CB] border-b border-white/20">
        <div
          className="
            max-w-7xl mx-auto
            px-6 pt-4 pb-6
            flex flex-col md:flex-row
            md:items-center md:justify-between
            gap-5 md:gap-0
          "
        >
          {/* LEFT: Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <Link href="/home" className="nav-link-main">
              Home
            </Link>

            <Link href="/packages" className="nav-link-main">
              Book Package
            </Link>

            <Link href="/itinerary" className="nav-link-main">
              Book Itinerary
            </Link>

            <Link href="/help" className="nav-link-main">
              Help
            </Link>

            <Link href="/about" className="nav-link-main">
              About Us
            </Link>
          </div>

          {/* RIGHT: User */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            {session?.user && (
              <Link
                href="/profile"
                className="
                  px-4 py-2 rounded-xl
                  bg-white/20 text-white text-sm font-semibold
                  backdrop-blur-md
                  shadow-sm
                  hover:bg-white/30
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  transition-all duration-200
                "
              >
                {session.user.name}
              </Link>
            )}

            {session?.user ? (
              <SignOut className="signout-btn" />
            ) : (
              <Link
                href="/login"
                className="
                  px-5 py-2 rounded-xl
                  bg-[#F3B54D]
                  text-white font-semibold
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
