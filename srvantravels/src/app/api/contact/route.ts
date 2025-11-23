import { NextResponse } from "next/server";
import UserService from "@/services/user-service";

const userService = new UserService();

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY: ", body);
    const updatedContact = await userService.addContact(body.contact_details);

    const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
    if (NEXTAUTH_URL) {
      await fetch(`${NEXTAUTH_URL}/api/auth/session?update=true`, {
        method: "POST",
      });
    }

    return NextResponse.json({
      updatedContact,
      message: "Successfully updated contact.",
    });
  } catch (error) {
    console.error("Unable to update contact.", error);
    return NextResponse.json(
      { person: null, message: "Contact update error" },
      { status: 500 }
    );
  }
}
