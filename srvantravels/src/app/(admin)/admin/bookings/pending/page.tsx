"use client";

import { useEffect, useState } from "react";
import AdminCustomLeftPanel from "@/src/app/components/ui/Admin/AdminBookings/Pending/AdminCustomLeftPanel";
import AdminCustomRightPanel from "@/src/app/components/ui/Admin/AdminBookings/Pending/AdminCustomRightPanel";

export interface PendingBookingSummary {
  order_ID: number;
  date_of_travel: string | null;
  itinerary: {
    type: "PACKAGE" | "CUSTOM";
    package_itinerary?: {
      package_name: string | null;
    };
  };
  customer: {
    person: {
      name: string | null;
    };
  };
}

const PendingBookingsPage = () => {
  // 1. Apply the interface here
  const [bookings, setBookings] = useState<PendingBookingSummary[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const fetchBookings = async () => {
    const res = await fetch("/api/pending-bookings", {
      cache: "no-store",
    });

    // 2. Tell TypeScript the JSON result matches your interface
    const data = (await res.json()) as PendingBookingSummary[];
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
      <div className="bg-primary-foreground rounded-lg col-span-1 p-4">
        <AdminCustomLeftPanel
          bookings={bookings}
          selectedOrderId={selectedOrderId}
          onSelect={setSelectedOrderId}
        />
      </div>

      <div className="bg-primary-foreground rounded-lg col-span-2 p-4">
        <AdminCustomRightPanel
          orderId={selectedOrderId}
          onActionComplete={(processedId) => {
            // TypeScript now knows 'b' is a PendingBookingSummary,
            // so it guarantees 'b.order_ID' exists.
            setBookings((prev) =>
              prev.filter((b) => b.order_ID !== processedId)
            );

            setSelectedOrderId(null);
          }}
        />
      </div>
    </div>
  );
};

export default PendingBookingsPage;
