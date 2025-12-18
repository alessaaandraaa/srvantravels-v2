import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const vans = await prisma.van.findMany({
    select: {
      plate_number: true,
      passenger_capacity: true,
      driver_ID: true,
      customer_ID: true,
      payment_ID: true,
    },
  });

  return NextResponse.json(
    vans.map(v => ({
      vanplatenumber: v.plate_number,
      capacity: v.passenger_capacity ?? 0,
      available:
        v.driver_ID === null &&
        v.customer_ID === null &&
        v.payment_ID === null,
    }))
  );
}
