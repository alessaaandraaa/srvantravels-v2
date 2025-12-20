import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.person.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) return null;

        let userRole = "USER";
        const isManager = await prisma.manager.findUnique({
          where: { manager_ID: user.person_ID },
        });

        if (isManager) {
          userRole = "MANAGER";
        } else {
          const isDriver = await prisma.driver.findUnique({
            where: { driver_ID: user.person_ID },
          });
          if (isDriver) userRole = "DRIVER";
        }

        return {
          id: user.person_ID,
          name: user.name,
          email: user.email,
          contact_number: user.contact_number,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.contact_number = user.contact_number;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          contact_number: token.contact_number,
        },
      };
    },
  },
};
