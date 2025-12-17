import { prisma } from "@/lib/db";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "@/types/db.types";

type payment_status = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

type Payment = {
  payment_method: (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
  down_payment: number;
  payment_status: payment_status;
};

class PaymentService {
  async addPayment({ payment_method, down_payment, payment_status }: Payment) {
    try {
      const newPayment = await prisma.payment.create({
        data: {
          payment_method:
            payment_method as (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD],
          down_payment,
          payment_status:
            payment_status as (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS],
        },
      });
      return newPayment;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw new Error("An unexpected error occurred while adding payment.");
    }
  }

  async getPayments(status?: payment_status) {
    try {
      return await prisma.payment.findMany({
        where: {
          payment_status: status,
        },
      });
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw new Error("Could not fetch payments.");
    }
  }
}

export default PaymentService;
