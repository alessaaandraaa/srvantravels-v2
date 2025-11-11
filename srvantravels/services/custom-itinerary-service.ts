const { prisma } = await import("@/lib/db");

type Custom_Itinerary = {
  custom_ID: number;
  is_made_by_customer: number;
};

class CustomItineraryService {
  async addCustomItinerary({
    custom_ID,
    is_made_by_customer,
  }: Custom_Itinerary) {
    try {
      const itinerary = await prisma.custom_Itinerary.create({
        data: {
          custom_ID,
          is_made_by_customer,
        },
      });

      return itinerary;
    } catch (error) {
      console.log("Error adding custom itinerary: ", error);
      throw new Error("Could not custom itinerary.");
    }
  }
}

export default CustomItineraryService;
