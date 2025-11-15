import { NextResponse } from "next/server";
import ItineraryStopsService from "@/services/itinerary-stops-service";

const stopsService = new ItineraryStopsService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itineraryId = searchParams.get("itineraryId");

    const orders = await stopsService.getItineraryStops(Number(itineraryId));

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching stops: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
