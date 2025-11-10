const { prisma } = await import("@/lib/db");

type Locations = {
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

  async getLocation(id: number) {
    try {
      const location = await prisma.locations.findUnique({
        where: { location_ID: id },
      });
      return location;
    } catch (error) {
      console.error("Error fetching location: ", error);
      throw new Error("Could not fetch location.");
    }
  }

  async addLocation({
    location_name,
    location_address,
    lng,
    lat,
    is_custom_made,
  }: Locations) {
    try {
      const newLocation = await prisma.locations.create({
        data: {
          location_name,
          location_address,
          lng,
          lat,
          is_custom_made,
        },
      });
    } catch (error) {
      console.error("Error adding location: ", error);
      throw new Error("Could not add location.");
    }
  }
}

export default LocationsService;
