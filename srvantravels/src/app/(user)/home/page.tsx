import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import PackageList from "../../../../components/user-ui/PackageList";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // LOGGED IN → SHOW PACKAGES
  if (session?.user?.name) {
    return (
      <div>
        <PackageList />
      </div>
    );
  }

  // NOT LOGGED IN → DESIGN THIS VIEW
  return (
    <section
      className="
        relative
        min-h-screen
        bg-center
        bg-no-repeat
        bg-fixed
        flex
        items-center
        justify-center
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg7.jpg')",
        backgroundSize: "100% 100%",
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          Welcome to SR Van Travels
        </h1>

        <p className="text-lg text-gray-700">
          Please log in to explore our travel packages, customize your
          itinerary, and start planning your journey with us.
        </p>

        <Link
          href="/login"
          className="
            inline-block
            px-8
            py-3
            rounded-xl
            bg-[#36B9CB]
            text-white
            text-lg
            font-semibold
            shadow-md
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all duration-200
          "
        >
          Log In to Continue
        </Link>

        <p className="text-sm text-gray-500">
          Don’t have an account yet?  
          <span className="font-semibold text-[#36B9CB]">
            {" "}Ask our staff to assist you.
          </span>
        </p>
      </div>
    </section>
  );
}
