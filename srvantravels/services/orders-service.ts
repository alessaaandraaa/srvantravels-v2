import { prisma } from "@/lib/db";

class OrdersService {
  async getOrders(customer_id: number) {
    try {
    } catch (error) {
      console.error("Error fetching orders: ", error);
      throw new Error("Unable to fetch orders.");
    }
  }
}

export default OrdersService;
