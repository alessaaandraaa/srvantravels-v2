const { prisma } = await import("@/lib/db");

type Locations = {
  location_ID: number;
  location_name: string;
  location_address: string;
  lng: number;
  lat: number;
  is_custom_made: boolean;
};

class LocationsService {
  async getLocations(onlyPreset?: boolean) {
    try {
      if (onlyPreset) {
        const presets = await prisma.locations.findMany({
          where: { is_custom_made: false },
        });
        return presets;
      }
      const locations = await prisma.locations.findMany();
      return locations;
    } catch (error) {
      console.error("Error fetching locations: ", error);
      throw new Error("Could not fetch locations.");
    }
  }
}

export default LocationsService;
