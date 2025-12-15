"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { UnfinishedOrdersListType } from "@/types/order.types";

interface OrderSelectProps {
  session: Session | null;
}

type OrderSimple = {
  orderName: string;
  orderId: number;
};

export default function OrderSelect({ session }: OrderSelectProps) {
  // Ensure we safely convert to number if it's a string
  const customerId = session?.user?.id ? Number(session.user.id) : null;
  const [orderList, setOrderList] = useState<OrderSimple[]>([]);

  console.log("RENDER DEBUG: ID is", customerId);

  useEffect(() => {
    if (!customerId) {
      console.log("⛔ No Customer ID, skipping fetch.");
      return;
    }

    console.log("🚀 Fetching for ID:", customerId);

    fetch(`/api/orders/unfin?customerId=${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        // robust check for the array
        const rawResponse = data.orders || data.unfin_orders || [];

        // 🛠️ FLATTEN: This removes the empty arrays and extracts the order
        const allOrders = rawResponse.flatMap(
          (customer: any) => customer.order_details
        );

        console.log("✅ REAL ORDERS FOUND:", allOrders);

        const formattedList = allOrders.map((order: any) => {
          // ... your mapping logic here
          return {
            orderName:
              order.itinerary?.package_itinerary?.package_name || "Custom",
            orderId: order.order_ID,
          };
        });

        setOrderList(formattedList);
      })
      .catch((err) => console.error("❌ Failed to load orders", err));
  }, [customerId]);

  return (
    <select
      className="border border-gray-300 rounded-md p-2 w-full"
      defaultValue=""
      // Ensure the name attribute is set so the form can read it!
      name="order_ID"
      onChange={(e) => console.log("Selected:", e.target.value)}
    >
      <option value="" disabled>
        Select a booking...
      </option>

      {orderList.map((item) => (
        <option key={item.orderId} value={item.orderId}>
          {item.orderName} ({item.orderId})
        </option>
      ))}
    </select>
  );
}
