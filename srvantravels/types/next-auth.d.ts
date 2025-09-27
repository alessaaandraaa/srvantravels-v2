import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name: string,
        email: string,
        contact_number?: string | null
    }
    interface Session {
        user: User & {
            name: string,
            email: string,
            contact_number: string | null
        }
        token: {
            name: string,
            email: string,
            contact_number: string | null
        }
    }
}