import { NextResponse } from "next/server"
import { PendingBookingsService } from "@/services/pending-bookings-service"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id)

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const data = await PendingBookingsService.getPendingBookingById(orderId)

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}
