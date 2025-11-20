"use client";
import { useState, useEffect } from "react";
import { OrdersListType } from "@/types/order.types";
import Order from "./Order";

export default function OrdersList(customer_id: { customer_id: number }) {
  const [orders, setOrders] = useState<OrdersListType>([]);
  const customerId = customer_id.customer_id;
  useEffect(() => {
    fetch(`/api/orders?customerId=${customerId}`)
      .then((response) => response.json())
      .then((json) => setOrders(json.orders));
  }, []);
  return (
    <div>
      <h2 className="text-3xl">MY BOOKINGS</h2>
      {orders.map((o) => (
        <Order key={o.order_details[0].order_ID} {...o} />
      ))}
    </div>
  );
}
