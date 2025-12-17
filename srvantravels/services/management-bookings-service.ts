import { prisma } from "@/lib/db";

export class ManageBookingsService {
    
  static async getBookingsThisWeek() {
    const start = new Date();
    start.setDate(start.getDate() - 7);

    return prisma.order_Details.count({
      where: {
        date_of_transaction: {
          gte: start,
        },
      },
    });
  }

    static async getOrdersNeedingDriver() {
        return prisma.order_Details.count({
            where: {
            driver_ID: null,
            status: {
                in: ["PENDING", "ACCEPTED"],
            },
            },
        });
    }

    static async getOrdersNeedingVan() {
        return prisma.order_Details.count({
            where: {
            customer: {
                van: {
                none: {}, 
                },
            },
            status: {
                in: ["PENDING", "ACCEPTED"],
            },
            },
        });
    }

  static async getManageBookingsTable() {
    return prisma.order_Details.findMany({
      orderBy: {
        date_of_travel: "asc",
      },
      include: {
        customer: {
          include: {
            person: true,
            van: true,
            payment: true,
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
        itinerary: true,
      },
    });
  }

  static async getManageBookingsTableFormatted() {
    const orders = await this.getManageBookingsTable();

    return orders.map(o => ({
      orderid: o.order_ID,
      paymentstatus: o.customer?.payment?.payment_status ?? "NOT PAID",
      name: o.customer?.person?.name ?? "—",
      type: o.itinerary?.type === "PACKAGE" ? "Package" : "Custom",
      date: o.date_of_travel?.toISOString().split("T")[0] ?? "—",
      driver: o.driver
        ? o.driver.employee.person.name
        : "—",
      vanplatenumber: o.customer?.van?.[0]?.plate_number ?? "—",
    }));
  }

  static async getAvailableDrivers(date: Date) {
    return prisma.driver.findMany({
      where: {
        Availability: true,
        order_details: {
          none: {
            date_of_travel: date,
          },
        },
      },
      include: {
        employee: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  static async getAvailableVans(date: Date) {
    return prisma.van.findMany({
      where: {
        customer_ID: null,
        payment_ID: null,
      },
    });
  }

}

