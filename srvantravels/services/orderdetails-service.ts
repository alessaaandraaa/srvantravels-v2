import { prisma } from "@/lib/db";
import { ORDER_STATUS } from "@/types/db.types";
type Order_Details = {
  customer_ID: number;
  itinerary_ID: number | null;
  payment_ID: number;
  number_of_PAX: number;
  date_of_travel: Date;
};

type CustomOrder_Details = {
  customer_ID: number;
  itinerary_ID: number | null;
  payment_ID: number;
  number_of_PAX: number;
  date_of_travel: Date;
  time_for_pickup: Date | null;
  time_for_dropoff: Date | null;
};

class OrderDetailsService {
  async addOrderDetails({
    customer_ID,
    payment_ID,
    itinerary_ID,
    number_of_PAX,
    date_of_travel,
  }: Order_Details) {
    try {
      const newOrderDetails = await prisma.order_Details.create({
        data: {
          customer_ID,
          payment_ID,
          itinerary_ID,
          number_of_PAX,
          date_of_travel,
        },
      });
      return newOrderDetails;
    } catch (error) {
      console.error("Error adding order details:", error);
      throw new Error(
        "An unexpected error occurred while adding order details."
      );
    }
  }

  async addCustomOrderDetails({
    customer_ID,
    payment_ID,
    itinerary_ID,
    number_of_PAX,
    date_of_travel,
    time_for_pickup,
    time_for_dropoff,
  }: CustomOrder_Details) {
    try {
      const newOrderDetails = await prisma.order_Details.create({
        data: {
          customer_ID,
          payment_ID,
          itinerary_ID,
          number_of_PAX,
          date_of_travel,
          time_for_pickup,
          time_for_dropoff,
        },
      });
      return newOrderDetails;
    } catch (error) {
      console.error("Error adding order details:", error);
      throw new Error(
        "An unexpected error occurred while adding order details."
      );
    }
  }

  async getOrderMonthlyStats(year: number) {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const orders = await prisma.order_Details.findMany({
      where: {
        date_of_transaction: { gte: startDate, lte: endDate },
        status: { in: ["ACCEPTED", "REJECTED"] },
      },
      select: { date_of_transaction: true, status: true },
    });

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const data = months.map((month) => ({
      month,
      accepted: 0,
      rejected: 0,
    }));

    orders.forEach((order) => {
      if (!order.date_of_transaction || !order.status) return;
      const monthIndex = order.date_of_transaction.getMonth();

      if (order.status === "ACCEPTED") data[monthIndex].accepted++;
      if (order.status === "REJECTED") data[monthIndex].rejected++;
    });

    return data;
  }

  async getTotalSales() {
    return prisma.order_Details.count({
      where: {
        status: ORDER_STATUS.ACCEPTED,
      },
    });
  }
}

export default OrderDetailsService;
