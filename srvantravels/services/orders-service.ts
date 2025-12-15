import { prisma } from "@/lib/db";
import { OrdersListType } from "@/types/order.types";
import { UnfinishedOrdersListType } from "@/types/order.types";
class OrdersService {
  async getOrders(customer_id: number): Promise<OrdersListType> {
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
              order_ID: true,
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

  async getUnfinishedOrders(
    customer_id: number
  ): Promise<UnfinishedOrdersListType> {
    try {
      const unfin_orders = await prisma.customer.findMany({
        where: {
          customer_ID: customer_id,
          // This ensures we only look at customers who HAVE future orders
          order_details: {
            some: {
              date_of_travel: { gte: new Date() },
            },
          },
        },
        select: {
          order_details: {
            // 🟢 1. FILTER: Only get orders where travel date is in the future
            where: {
              date_of_travel: {
                gte: new Date(),
              },
            },
            // 🟢 2. SORT: Sort the orders by date
            orderBy: {
              date_of_travel: "asc",
            },
            select: {
              order_ID: true,
              date_of_travel: true,
              itinerary: {
                select: {
                  itinerary_ID: true,
                  type: true,
                  package_itinerary: {
                    select: {
                      package_name: true,
                    },
                  },
                  // 🟢 3. DATA: Get the ID for custom trips
                  custom_itinerary: {
                    select: {
                      custom_ID: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return unfin_orders;
    } catch (error) {
      console.error("Error fetching orders: ", error);
      throw new Error("Unable to fetch orders.");
    }
  }
}

export default OrdersService;
