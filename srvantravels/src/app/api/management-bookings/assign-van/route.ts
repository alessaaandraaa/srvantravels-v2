import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { orderId, plateNumber } = await req.json();

  const order = await prisma.order_Details.findUnique({
    where: { order_ID: orderId },
    select: {
      customer_ID: true,
      payment_ID: true,
    },
  });

  if (!order?.customer_ID || !order?.payment_ID) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  await prisma.van.update({
    where: { plate_number: plateNumber },
    data: {
      customer_ID: order.customer_ID,
      payment_ID: order.payment_ID,
    },
  });

  return NextResponse.json({ success: true });
}

