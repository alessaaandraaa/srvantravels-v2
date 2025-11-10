import { NextResponse } from "next/server";
import LocationsService from "@/services/locations-service";

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
