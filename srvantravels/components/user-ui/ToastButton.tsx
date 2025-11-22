"use client";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";

export default function ToastButton() {
  useEffect(() => {
    toast.warning(
      <div>
        <p>You still haven&apos;t added your contact number!</p>
        <Link
          href="/profile"
          className="bg-amber-200 text-black hover:bg-amber-400 rounded-2xl"
        >
          Click here to add
        </Link>
      </div>
    );
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
}
