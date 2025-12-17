import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    contact_number: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      contact_number: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    contact_number: string | null;
  }
}
