import { NextResponse } from "next/server";
import LocationsService from "@/services/locations-service";
import { prisma } from "@/lib/db";

const locationsService = new LocationsService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const onlyPresetParam = searchParams.get("onlyPreset");

    const onlyPreset: boolean =
      onlyPresetParam !== null && /^(true|1|yes)$/i.test(onlyPresetParam);

    const locations = await locationsService.getLocations(onlyPreset);
    return NextResponse.json({ locations }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching locations: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newPresetLoc = await locationsService.addLocation({
      location_name: body.location_name,
      location_address: body.location_address,
      lat: body.lat,
      lng: body.lng,
      is_custom_made: body.is_custom_made,
    });

    return NextResponse.json(
      { newPresetLoc, message: "Location successfully added." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unable to add new preset location", error);
    return NextResponse.json(
      { person: null, message: "Internal server error" },
      { status: 500 }
    );
  }
}
