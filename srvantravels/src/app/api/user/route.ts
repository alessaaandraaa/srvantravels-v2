import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  // REGISTER
  try {
    const body = await req.json();
    const { name, password, email, contact_number } = body;

    const existingEmail = await prisma.person.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { person: null, message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.person.create({
        data: {
            name,
            password: hashedPassword,
            email
        }
    })

    const { password: _, ...noPassUser } = newUser;

    return NextResponse.json(
        {person: noPassUser, message: "User successfully created."},
        {status: 201}
    );
  } catch (error) {
    console.error("POST /register error:", error);
    return NextResponse.json(
    {person: null, message: "Internal server error" },
    { status: 500 }
  );}
}
