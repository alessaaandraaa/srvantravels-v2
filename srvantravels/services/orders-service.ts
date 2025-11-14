import { prisma } from "@/lib/db";

class OrdersService {
  async getOrders(customer_id: number) {
    try {
      const orders = await prisma.customer.findMany({
        where: {
          customer_ID: customer_id,
          order_details: {
            some: {},
          },
        },
        select: {
          date_of_travel: true,
          number_of_PAX: true,
          ID_Picture: true,

          payment: {
            select: {
              payment_method: true,
              payment_status: true,
            },
          },

          order_details: {
            select: {
              time_for_pickup: true,
              time_for_dropoff: true,
              status: true,

              itinerary: {
                select: {
                  itinerary_ID: true,
                  type: true,

                  package_itinerary: {
                    select: {
                      package_name: true,
                      route: true,
                      inclusions: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          date_of_travel: "asc",
        },
      });

      return orders;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      throw new Error("Unable to fetch orders.");
    }
  }
}

export default OrdersService;
