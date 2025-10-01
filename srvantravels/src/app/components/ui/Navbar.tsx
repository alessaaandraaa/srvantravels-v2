import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex gap-50 justify-center">
      <div className="bg-gray-300">
        <Link href="/home" className="hover:bg-amber-950 hover:text-amber-300">
          Home
        </Link>
      </div>
      <div className="bg-gray-300">
        <Link
          href="/packages"
          className="hover:bg-amber-950 hover:text-amber-300"
        >
          Book Package
        </Link>
      </div>
      <div className="bg-gray-300">
        <p className="hover:bg-amber-950 hover:text-amber-300">
          Book Itinerary
        </p>
      </div>
      <div className="bg-gray-300">
        <p className="hover:bg-amber-950 hover:text-amber-300">Help</p>
      </div>
      <div className="bg-gray-300">
        <p className="hover:bg-amber-950 hover:text-amber-300">About Us</p>
      </div>
      <div className="bg-gray-300">
        <p className="hover:bg-amber-950 hover:text-amber-300">
          {session?.user?.name}
        </p>
      </div>
      <div className="bg-gray-300 pl-2">
        {session?.user ? <SignOut /> : <Link href="/login">Login</Link>}
      </div>
    </div>
  );
}
