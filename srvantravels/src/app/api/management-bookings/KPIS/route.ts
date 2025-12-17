import { NextResponse } from "next/server";
import { ManageBookingsService } from "@/services/management-bookings-service";

export async function GET() {
  const [
    bookingsThisWeek,
    needsDriver,
    needsVan,
  ] = await Promise.all([
    ManageBookingsService.getBookingsThisWeek(),
    ManageBookingsService.getOrdersNeedingDriver(),
    ManageBookingsService.getOrdersNeedingVan(),
  ]);

  return NextResponse.json({
    bookingsThisWeek,
    needsDriver,
    needsVan,
  });
}
