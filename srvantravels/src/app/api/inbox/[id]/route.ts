// src/app/api/admin/inbox/[id]/route.ts
import { InboxService } from "@/services/inbox-service"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const messageId = Number(params.id)

    const message = await InboxService.getMessageById(messageId)

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch message" },
      { status: 500 }
    )
  }
}
