import { InboxService } from "@/services/inbox-service"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const inbox = await InboxService.getInboxList()

    const formatted = inbox.map(msg => ({
      ...msg,
      sender: msg.person_message_sender_IDToperson,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inbox" },
      { status: 500 }
    )
  }
}

