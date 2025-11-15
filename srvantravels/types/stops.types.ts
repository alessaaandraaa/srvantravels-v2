import { Prisma } from "@prisma/client"; // Import the 'Prisma' type

const stopsQuerySelector = {
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
};

export type StopsPayload = Prisma.Itinerary_StopsGetPayload<
  typeof stopsQuerySelector
>;
export type StopsListType = StopsPayload[];
