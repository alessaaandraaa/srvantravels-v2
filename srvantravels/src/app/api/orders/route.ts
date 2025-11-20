import { NextResponse } from "next/server";
import OrdersService from "@/services/orders-service";

const ordersService = new OrdersService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    const orders = await ordersService.getOrders(Number(customerId));

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching orders: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
