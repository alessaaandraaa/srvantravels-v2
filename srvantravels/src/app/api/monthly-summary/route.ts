import { NextResponse } from "next/server"
import { MonthlySummaryService } from "@/services/monthly-summary-services"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const year = Number(searchParams.get("year"))
  const month = Number(searchParams.get("month"))

  if (!year || !month) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 })
  }

  const orders = await MonthlySummaryService.getMonthlyOrders(year, month)

  const formatted = orders.map(o => ({
    orderid: o.order_ID,
    username: o.customer!.person!.name!,
    type: o.itinerary!.type === "CUSTOM" ? "Custom" : "Package",
    revenue: Number(o.itinerary!.price),
  }))

  return NextResponse.json(formatted)
}
