const { prisma } = await import("@/lib/db")
import { ORDER_STATUS } from "@/types/db.types"

export class PendingBookingsService {

  static async getPendingBookings() {
    return prisma.order_Details.findMany({
        where: {
        status: ORDER_STATUS.PENDING,
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

  static async approveBooking(orderId: number) {
    console.log("APPROVING ORDER:", orderId)
    return prisma.$transaction(async tx => {
      const order = await tx.order_Details.findUnique({
        where: { order_ID: orderId },
        include: {
          customer: {
            include: {
              person: true,
            },
          },
        },
      })

      if (!order || !order.customer?.person) {
        throw new Error("Order not found")
      }

      await tx.order_Details.update({
        where: { order_ID: orderId },
        data: {
          status: ORDER_STATUS.ACCEPTED,
        },
      })

      await tx.message.create({
        data: {
          sender_ID: 143,
          receiver_ID: order.customer.person.person_ID,
          order_ID: orderId,
          subject: "Booking Approved",
          content:
            "Good news! Your booking request has been approved. Our team will coordinate with you shortly.",
          type: "GENERAL_INQUIRY",
        },
      })

      return { success: true }
    })
  }

  static async rejectBooking(orderId: number, reason?: string) {
    return prisma.$transaction(async tx => {
      const order = await tx.order_Details.findUnique({
        where: { order_ID: orderId },
        include: {
          customer: {
            include: {
              person: true,
            },
          },
        },
      })

      if (!order || !order.customer?.person) {
        throw new Error("Order not found")
      }

      await tx.order_Details.update({
        where: { order_ID: orderId },
        data: {
          status: ORDER_STATUS.REJECTED,
        },
      })

      await tx.message.create({
        data: {
          sender_ID: 143,
          receiver_ID: order.customer.person.person_ID,
          order_ID: orderId,
          subject: "Booking Rejected",
          content:
            reason ??
            "We regret to inform you that your booking request has been rejected. Please contact support for further assistance.",
          type: "CANCELLATION_REQUEST",
        },
      })

      return { success: true }
    })
  }
}
