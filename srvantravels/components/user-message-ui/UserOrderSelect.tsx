"use client";

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface OrderSelectProps {
  user_id: number | null;
  registration: Partial<UseFormRegisterReturn>;
}

type OrderSimple = {
  orderName: string;
  orderId: number;
};

type id = { user_id: number | null };

export default function OrderSelect({
  user_id,
  registration,
}: OrderSelectProps) {
  // Ensure we safely convert to number if it's a string
  const [orderList, setOrderList] = useState<OrderSimple[]>([]);

  useEffect(() => {
    fetch(`/api/orders/unfin?customerId=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        const rawResponse = data.orders || data.unfin_orders || [];
        const allOrders = rawResponse.flatMap(
          (customer: any) => customer.order_details
        );

        const formattedList = allOrders.map((order: any) => {
          return {
            orderName:
              order.itinerary?.package_itinerary?.package_name || "Custom",
            orderId: order.order_ID,
          };
        });

        setOrderList(formattedList);
      })
      .catch((err) => console.error("Failed to load orders", err));
  }, [user_id]);

  return (
    <select
      className="border border-gray-300 rounded-md p-2 w-full"
      defaultValue=""
      {...registration}
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
