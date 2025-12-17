import { NextResponse } from "next/server";
import OrderDetailsService from "@/services/orderdetails-service";

const orderDetailsService = new OrderDetailsService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    const year = yearParam ? Number(yearParam) : new Date().getFullYear();

    const monthlyStats = await orderDetailsService.getOrderMonthlyStats(year);

    return NextResponse.json({ monthlyStats }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching locations: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
