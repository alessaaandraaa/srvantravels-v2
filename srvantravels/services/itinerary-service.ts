const { prisma } = await import("@/lib/db");
import { ITINERARY_TYPES } from "@/types/db.types";

type Itinerary = {
  price: number;
  type: (typeof ITINERARY_TYPES)[keyof typeof ITINERARY_TYPES];
};

class ItineraryService {
  async addItinerary({ price, type }: Itinerary) {
    try {
      const itinerary = await prisma.itinerary.create({
        data: {
          price,
          type,
        },
      });

      return itinerary;
    } catch (error) {
      console.log("Error adding itinerary: ", error);
      throw new Error("Could not add itinerary.");
    }
  }
}

export default ItineraryService;
