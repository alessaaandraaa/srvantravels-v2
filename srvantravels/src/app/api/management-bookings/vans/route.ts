import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const vans = await prisma.van.findMany({
    where: {
      customer_ID: null,
      payment_ID: null,
    },
  });

  return NextResponse.json(
    vans.map((v) => ({
      vanplatenumber: v.plate_number,
      capacity: v.passenger_capacity ?? 0,
    }))
  );
}
