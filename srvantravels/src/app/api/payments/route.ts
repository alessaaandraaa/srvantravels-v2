import { NextResponse } from "next/server";
import PaymentService from "@/services/payment-service";
import { prisma } from "@/lib/db";
import { PAYMENT_STATUS } from "@/types/db.types";

const paymentService = new PaymentService();
type payment_status = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export async function GET(req: Request, status: payment_status) {
  try {
    const payments = await paymentService.getPayments(status);
    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching locations: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
