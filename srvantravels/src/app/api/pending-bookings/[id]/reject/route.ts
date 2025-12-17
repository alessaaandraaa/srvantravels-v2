export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { PendingBookingsService } from "@/services/pending-bookings-service"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}))

    await PendingBookingsService.rejectBooking(
      Number(params.id),
      body.reason
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reject booking" },
      { status: 500 }
    )
  }
}
