const { prisma } = await import("@/lib/db");
import { itinerary_type } from "@prisma/client";

type Itinerary = {
  price: number;
  type: itinerary_type;
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
    } catch (error) {
      console.log("Error adding itinerary: ", error);
      throw new Error("Could not add itinerary.");
    }
  }
}

export default ItineraryService;
