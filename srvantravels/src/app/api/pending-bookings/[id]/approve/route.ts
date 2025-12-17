export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { PendingBookingsService } from "@/services/pending-bookings-service"

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await PendingBookingsService.approveBooking(Number(params.id))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to approve booking" },
      { status: 500 }
    )
  }
}
