import { prisma } from "@/lib/db";

type Order_Details = {
  customer_ID: number;
  itinerary_ID: number | null;
  payment_ID: number;
  number_of_PAX: number;
  date_of_travel: Date;
};

class OrderDetailsService {
  async addOrderDetails({
    customer_ID,
    payment_ID,
    itinerary_ID,
    number_of_PAX,
    date_of_travel,
  }: Order_Details) {
    try {
      const newOrderDetails = await prisma.order_Details.create({
        data: {
          customer_ID,
          payment_ID,
          itinerary_ID,
          number_of_PAX,
          date_of_travel,
        },
      });
      return newOrderDetails;
    } catch (error) {
      console.error("Error adding order details:", error);
      throw new Error(
        "An unexpected error occurred while adding order details."
      );
    }
  }

  // TODO: GET, EDIT, DELETE
}

export default OrderDetailsService;
