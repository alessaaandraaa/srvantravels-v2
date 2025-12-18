import { NextResponse } from "next/server"
import { PackageItineraryService } from "@/services/package-itinerary-services"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  await PackageItineraryService.updatePackage(Number(params.id), body)

  return NextResponse.json({ success: true })
}
