import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { plateNumber, customerId, paymentId } = await req.json();

  await prisma.van.update({
    where: { plate_number: plateNumber },
    data: {
      customer_ID: customerId,
      payment_ID: paymentId,
    },
  });

  return NextResponse.json({ success: true });
}
