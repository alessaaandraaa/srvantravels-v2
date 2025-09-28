import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link
        href="/login"
        className="rounded-4xl bg-amber-950 text-amber-100 p-5 hover:bg-amber-200 hover:text-amber-950"
      >
        Click here to login
      </Link>
    </div>
  );
}
