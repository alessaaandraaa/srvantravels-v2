"use client";
import { useState, useEffect } from "react";
import { OrdersListType } from "@/types/order.types";
import Order from "./Order";

export default function OrdersList(customer_id: { customer_id: number }) {
  const [orders, setOrders] = useState<OrdersListType>([]);
  const [loading, setLoading] = useState(true);
  const customerId = customer_id.customer_id;

  useEffect(() => {
    fetch(`/api/orders?customerId=${customerId}`)
      .then((response) => response.json())
      .then((json) => setOrders(json.orders))
      .finally(() => setLoading(false));
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-[#36B9CB] border-t-transparent rounded-full" />
        <p className="ml-3 text-gray-600 font-semibold">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Your Bookings
        </h2>
        {orders.length > 0 && (
          <span className="bg-[#36B9CB] text-white px-4 py-2 rounded-full text-sm font-bold">
            {orders.length} booking{orders.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-[#36B9CB] p-6 rounded-xl text-center">
          <p className="text-gray-700 font-semibold mb-1">No bookings yet</p>
          <p className="text-sm text-gray-600">
            Start your journey with us by booking a package today!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Order key={o.order_details[0].order_ID} {...o} />
          ))}
        </div>
      )}
    </div>
  );
}
