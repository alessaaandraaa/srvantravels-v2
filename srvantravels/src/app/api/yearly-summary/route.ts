import { NextResponse } from "next/server"
import { MonthlySummaryService } from "@/services/monthly-summary-services"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const year = Number(searchParams.get("year"))

  if (!year) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 })
  }

  const summary = await MonthlySummaryService.getYearlySummary(year)
  return NextResponse.json(summary)
}
