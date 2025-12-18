"use client";

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import type { UnfinishedOrdersListType } from "@/types/order.types";

interface OrderSelectProps {
  user_id: number | null;
  registration: Partial<UseFormRegisterReturn>;
}

interface ApiResponse {
  orders?: UnfinishedOrdersListType;
  unfin_orders?: UnfinishedOrdersListType;
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
      .then((data: ApiResponse) => {
        const rawResponse = data.orders || data.unfin_orders || [];

        const allOrders = rawResponse.flatMap(
          (customer) => customer.order_details
        );

        const formattedList = allOrders.map((order) => {
          const pkgName = order.itinerary?.package_itinerary?.package_name;
          const isCustom = order.itinerary?.custom_itinerary?.custom_ID;

          return {
            orderName:
              pkgName || (isCustom ? "Custom Itinerary" : "Unknown Order"),
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
