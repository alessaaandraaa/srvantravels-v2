import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const orderId = Number(params.id);

  const order = await prisma.order_Details.findUnique({
    where: { order_ID: orderId },
    include: {
      customer: {
        include: {
          person: true,
          payment: true,
        },
      },
      itinerary: {
        include: {
          package_itinerary: true,
          custom_itinerary: {
            include: {
              Itinerary_Stops: {
                include: {
                  locations: true,
                },
              },
            },
          },
        },
      },
      driver: {
        include: {
          employee: {
            include: {
              person: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  /* ===============================
     HANDLE STOPS (PACKAGE vs CUSTOM)
     =============================== */

  let stops: { name: string }[] = [];

  if (
    order.itinerary?.type === "PACKAGE" &&
    order.itinerary.package_itinerary?.route
  ) {
    // PACKAGE → split route string
    stops = order.itinerary.package_itinerary.route
      .split("->")
      .map((s) => ({ name: s.trim() }));
  }

  if (
    order.itinerary?.type === "CUSTOM" &&
    order.itinerary.custom_itinerary?.Itinerary_Stops
  ) {
    // CUSTOM → itinerary_stops table
    stops = order.itinerary.custom_itinerary.Itinerary_Stops.map((s) => ({
      name: s.locations?.location_name ?? "Unknown stop",
    }));
  }

  /* ===============================
     FINAL RESPONSE (UI-FRIENDLY)
     =============================== */
    return NextResponse.json({
    clientName: order.customer?.person?.name ?? "—",

    stops,

    date: order.date_of_travel,

    pax: order.number_of_PAX ?? "—",

    driver:
      order.driver?.employee?.person?.name ??
      "Unassigned",

    timePickup: order.time_for_pickup
      ? order.time_for_pickup.toISOString().slice(11, 16)
      : "—",

    paymentMethod:
      order.customer?.payment?.payment_method ?? "—",

    luggage: order.customer?.number_of_luggage ?? "—",
  });
}

