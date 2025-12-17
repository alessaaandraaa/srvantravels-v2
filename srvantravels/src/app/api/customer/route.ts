import { NextResponse } from "next/server";
import CustomerService from "@/services/customer-service";
import { prisma } from "@/lib/db";

const customerService = new CustomerService();

export async function GET(req: Request) {
  try {
    const count = await customerService.getTotalCustomers();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching locations: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
