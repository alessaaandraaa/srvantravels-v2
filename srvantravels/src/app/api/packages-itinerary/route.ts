import { NextResponse } from "next/server"
import { PackageItineraryService } from "@/services/package-itinerary-services"

export async function GET() {
  const data = await PackageItineraryService.getAllPackages()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  await PackageItineraryService.createPackage(body)
  return NextResponse.json({ success: true })
}
