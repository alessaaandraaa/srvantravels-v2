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
        <p className="hover:bg-amber-950 hover:text-amber-300">Help</p>
      </div>
      <div>
        <p className="hover:bg-amber-950 hover:text-amber-300">About Us</p>
      </div>
      <div>
        <p className="text-white hover:text-teal-800 hover:font-bold">
          {session?.user?.name}
        </p>
      </div>
      <div className="text-white hover:text-teal-800 hover:font-bold">
        {session?.user ? <SignOut /> : <Link href="/login">Login</Link>}
      </div>
    </div>
  );
}
