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

}

