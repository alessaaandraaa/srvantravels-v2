const { prisma } = await import("@/lib/db")

export class PendingBookingsService {

  static async getPendingBookings() {
    return prisma.order_Details.findMany({
        where: {
        status: "PENDING",
        itinerary_ID: {
            not: null, 
        },
        },
        orderBy: {
        date_of_transaction: "desc",
        },
        select: {
        order_ID: true,
        date_of_travel: true,
        itinerary: {
            select: {
            type: true,
            package_itinerary: {
                select: {
                package_name: true,
                },
            },
            },
        },
        customer: {
            select: {
            person: {
                select: {
                name: true,
                },
            },
            },
        },
        },
    })
    }


  static async getPendingBookingById(orderId: number) {
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
                  orderBy: {
                    stop_order: "asc",
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!order || !order.itinerary) return null

    // PACKAGE
    if (order.itinerary.type === "PACKAGE") {
      const route = order.itinerary.package_itinerary?.route ?? ""

      return {
        order_ID: order.order_ID,
        itineraryType: "PACKAGE",
        customerName: order.customer?.person?.name ?? "",
        stops: route.split("->").map(s => s.trim()),
        date: order.date_of_travel,
        time: order.time_for_pickup,
        pax: order.number_of_PAX,
        luggage: order.customer?.number_of_luggage,
        paymentMethod: order.customer?.payment?.payment_method,
      }
    }

    // CUSTOM
    return {
      order_ID: order.order_ID,
      itineraryType: "CUSTOM",
      customerName: order.customer?.person?.name ?? "",
      stops:
        order.itinerary.custom_itinerary?.Itinerary_Stops.map(
          s => s.locations?.location_name ?? ""
        ) ?? [],
      date: order.date_of_travel,
      time: order.time_for_pickup,
      pax: order.number_of_PAX,
      luggage: order.customer?.number_of_luggage,
      paymentMethod: order.customer?.payment?.payment_method,
    }
  }
}
