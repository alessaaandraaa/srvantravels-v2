import "server-only";
import { prisma } from "@/lib/db";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/types/db.types";

export async function getAcceptedRejectedPerMonth(year: number) {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  const orders = await prisma.order_Details.findMany({
    where: {
      date_of_transaction: {
        gte: startDate,
        lte: endDate,
      },
      status: {
        in: ["ACCEPTED", "REJECTED"],
      },
    },
    select: {
      date_of_transaction: true,
      status: true,
    },
  });

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const data = months.map((month) => ({
    month,
    accepted: 0,
    rejected: 0,
  }));

  orders.forEach((order) => {
    if (!order.date_of_transaction || !order.status) return;

    const monthIndex = order.date_of_transaction.getMonth();

    if (order.status === "ACCEPTED") {
      data[monthIndex].accepted++;
    }

    if (order.status === "REJECTED") {
      data[monthIndex].rejected++;
    }
  });

  return data;
}

export async function getTotalSales() {
  return prisma.order_Details.count({
    where: {
      status: ORDER_STATUS.ACCEPTED,
    },
  });
}


// export async function getTotalRevenue() {
//   const result = await prisma.payment.findMany({
//     where: {
//       payment_status: PAYMENT_STATUS.FULLY_PAID,
//     },
//     _sum: {
//       down_payment: true,
//     },
//   });

//   return result._sum.down_payment?.toNumber() ?? 0;
// }


export async function getTotalCustomers() {
  return prisma.customer.count();
}
