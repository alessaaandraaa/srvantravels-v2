import { NextResponse } from "next/server";
import MessagesService from "@/services/messages-service";
import { prisma } from "@/lib/db";

const messagesService = new MessagesService();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newMessage = await messagesService.addMessage({
      sender_ID: body.sender_ID,
      receiver_ID: body.receiver_ID,
      order_ID: body.order_ID,
      requested_date: body.request_date,
      subject: body.subject,
      content: body.content,
      type: body.type,
    });

    return NextResponse.json(
      { newMessage, message: "Message successfully sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unable to send message", error);
    return NextResponse.json(
      { person: null, message: "Internal server error" },
      { status: 500 }
    );
  }
}
