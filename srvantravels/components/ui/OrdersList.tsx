"use client";
import { useState, useEffect } from "react";

export default function OrdersList(customer_id: { customer_id: number }) {
  const [orders, setOrders] = useState([]);
  const customerId = customer_id.customer_id;
  useEffect(() => {
    fetch(`/api/orders?customerId=${customerId}`)
      .then((response) => response.json())
      .then((json) => setOrders(json.orders));
  }, []);

  console.log("ORDERS: ", orders);
  return <div>Hi</div>;
}
