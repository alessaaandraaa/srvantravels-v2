import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { orderId, driverId } = await req.json();

  await prisma.$transaction([
    prisma.order_Details.update({
      where: { order_ID: orderId },
      data: { driver_ID: driverId },
    }),
    prisma.driver.update({
      where: { driver_ID: driverId },
      data: { Availability: false },
    }),
  ]);

  return NextResponse.json({ success: true });
}
