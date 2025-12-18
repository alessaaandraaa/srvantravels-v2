import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-around p-5 bg-teal-500 shadow-2xs">
      <div>
        <Link
          href="/home"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          Home
        </Link>
      </div>
      <div>
        <Link
          href="/packages"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          Book Package
        </Link>
      </div>
      <div>
        <Link
          href="/itinerary"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          Book Itinerary
        </Link>
      </div>
      <div>
        <Link
          href="/help"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          Help
        </Link>
      </div>
      <div>
        <Link
          href="/about"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          About Us
        </Link>
      </div>
      <div>
        <Link
          href="/message"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          Inbox
        </Link>
      </div>
      <div>
        <Link
          href="/profile"
          className="text-white hover:text-teal-800 hover:font-bold"
        >
          {session?.user?.name}
        </Link>
      </div>
      <div className="text-white hover:text-teal-800 hover:font-bold">
        {session?.user ? <SignOut /> : <Link href="/login">Login</Link>}
      </div>
    </div>
  );
}
