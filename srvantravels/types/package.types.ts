import { Prisma } from "@/prisma/generated/client";

// 1. Define the query shape
const packageQuery = {
  include: {
    package_itinerary_tag: {
      include: {
        tag: true,
      },
    },
  },
};

export type PackageWithTags = Prisma.Package_ItineraryGetPayload<
  typeof packageQuery
>;
