import { Prisma } from "@prisma/client"; // Import the 'Prisma' type
import { prisma } from "@/lib/db";

// THIS IS THE "BLUEPRINT"
// It's just your 'select' object from the query
const ordersQuerySelector = {
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
};

export type OrderPayload = Prisma.CustomerGetPayload<
  typeof ordersQuerySelector
>;
export type OrdersListType = OrderPayload[];
