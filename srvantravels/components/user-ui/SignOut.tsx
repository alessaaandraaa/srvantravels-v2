"use client";

import { signOut } from "next-auth/react";

export default function SignOut({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => signOut()}
      className={`signout-btn ${className}`}
    >
      Sign out
    </button>
  );
}
