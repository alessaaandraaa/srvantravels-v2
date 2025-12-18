import { NextResponse } from "next/server"
import { PackageItineraryService } from "@/services/package-itinerary-services"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  await PackageItineraryService.updatePackage(Number(id), body)

  return NextResponse.json({ success: true })
}

