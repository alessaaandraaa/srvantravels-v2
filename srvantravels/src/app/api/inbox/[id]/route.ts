import { InboxService } from "@/services/inbox-service"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const raw = await InboxService.getMessageById(Number(params.id))

    if (!raw) {
      return NextResponse.json(null)
    }

    const formatted = {
      ...raw,
      sender: raw.person_message_sender_IDToperson,
    }

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch message" },
      { status: 500 }
    )
  }
}

