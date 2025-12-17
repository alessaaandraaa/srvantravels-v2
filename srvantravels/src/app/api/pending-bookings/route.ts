import { NextResponse } from "next/server"
import { PendingBookingsService } from "@/services/pending-bookings-service"

export async function GET() {
  try {
    const data = await PendingBookingsService.getPendingBookings()
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch pending bookings" },
      { status: 500 }
    )
  }
}
