import { prisma } from "@/lib/db"

export class MonthlySummaryService {
  static async getMonthlyOrders(year: number, month: number) {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 1)

    return prisma.order_Details.findMany({
      where: {
        status: "ACCEPTED",
        date_of_transaction: {
          gte: start,
          lt: end,
        },
        customer_ID: { not: null },
        itinerary_ID: { not: null },
      },
      include: {
        customer: {
          include: {
            person: true,
          },
        },
        itinerary: true,
      },
    })
  }

  static async getYearlySummary(year: number) {

    const rows = await prisma.order_Details.findMany({
      where: {
        status: "ACCEPTED",
        date_of_transaction: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
      select: {
        date_of_transaction: true,
        itinerary: { select: { price: true } },
        customer_ID: true,
      },
    })

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      bookings: 0,
      revenue: 0,
      clients: new Set<number>(),
    }))

    rows.forEach(r => {
      const m = r.date_of_transaction!.getMonth()
      months[m].bookings++
      months[m].revenue += Number(r.itinerary?.price ?? 0)
      if (r.customer_ID) months[m].clients.add(r.customer_ID)
    })

    return months.map(m => ({
      month: m.month,
      bookingsCompleted: m.bookings,
      totalRevenue: m.revenue,
      avgPerBooking: m.bookings ? m.revenue / m.bookings : 0,
      totalClients: m.clients.size,
    }))
  }
}
