import { NextResponse } from "next/server";
import OrderDetailsService from "@/services/orderdetails-service";
const orderDetailsService = new OrderDetailsService();

export async function GET(req: Request) {
  try {
    const sales = await orderDetailsService.getTotalSales();
    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching locations: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
