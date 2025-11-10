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
}

export default ItineraryStopsService;
