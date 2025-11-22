import { prisma } from "@/lib/db";
import { payment_payment_method, Payment_payment_status } from "@prisma/client";

type Payment = {
  payment_method: payment_payment_method;
  down_payment: number;
  payment_status: Payment_payment_status;
};

class PaymentService {
  async addPayment({ payment_method, down_payment, payment_status }: Payment) {
    try {
      const newPayment = await prisma.payment.create({
        data: {
          payment_method: payment_method as payment_payment_method,
          down_payment,
          payment_status: payment_status as Payment_payment_status,
        },
      });
      return newPayment;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw new Error("An unexpected error occurred while adding payment.");
    }
  }
  // TODO: GET, EDIT, DELETE
}

export default PaymentService;
