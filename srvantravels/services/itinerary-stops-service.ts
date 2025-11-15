const { prisma } = await import("@/lib/db");

type ItineraryStops = {
  custom_ID: number;
  stop_order: number;
  location_ID: number;
};

class ItineraryStopsService {
  async addItineraryStop({
    custom_ID,
    stop_order,
    location_ID,
  }: ItineraryStops) {
    try {
      const itineraryStop = await prisma.itinerary_Stops.create({
        data: {
          custom_ID,
          stop_order,
          location_ID,
        },
      });
    } catch (error) {
      console.log("Error adding itinerary stop: ", error);
      throw new Error("Could not add itinerary stop.");
    }
  }

  async getItineraryStops(itinerary_id: number) {
    const stops = await prisma.itinerary_Stops.findMany({
      where: {
        custom_ID: itinerary_id,
      },
      select: {
        location_ID: true,
        locations: {
          select: {
            location_name: true,
            location_address: true,
          },
        },
        stop_order: true,
      },
      orderBy: {
        stop_order: "asc",
      },
    });

    return stops;
  }
}

export default ItineraryStopsService;
