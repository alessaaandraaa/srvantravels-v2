// src/app/api/admin/inbox/route.ts
import { InboxService } from "@/services/inbox-service"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const inbox = await InboxService.getInboxList()
    return NextResponse.json(inbox)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inbox" },
      { status: 500 }
    )
  }
}

