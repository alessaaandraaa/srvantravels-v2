"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useCustomerDetailsStore,
  useLocationsStore,
} from "@/store/custom-itinerary.store";
import CustomSummary from "./CustomSummary";

export default function CustomSummaryFull() {
  const router = useRouter();
  const customerDetails = useCustomerDetailsStore((s) => s.customerDetails);
  const locations = useLocationsStore((s) => s.locations);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !customerDetails) {
      router.push("/itinerary");
    }
  }, [hydrated, customerDetails, router]);

  if (!hydrated || !customerDetails) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  async function bookItinerary() {
    const body = {
      payment: {
        payment_method: "PENDING",
        down_payment: 100,
        payment_status: "NOT_PAID",
      },
      customer: {
        customer_id: customerDetails.customer_id,
        number_of_PAX: Number(customerDetails.number_of_PAX),
        date_of_travel: customerDetails.date_of_travel,
        number_of_luggage: Number(customerDetails.number_of_luggage),
        time_for_pickup: customerDetails.time_for_pickup,
        time_for_dropoff: customerDetails.time_for_dropoff,
        ID_PictureB64: customerDetails.ID_picture,
      },
      itinerary: {
        price: 500,
        type: "CUSTOM",
      },
      locations,
    };

    const response = await fetch("/api/custom-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.ok) {
      router.push(
        `/itinerary/customer-details/end?order_id=${data.order_ID}`
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Main content */}
      <CustomSummary />

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="
              text-sm font-semibold
              text-gray-600
              hover:text-black
              transition
            "
          >
            ← Back
          </button>

          {/* Book */}
          <button
            onClick={bookItinerary}
            className="
              px-8 py-3
              rounded-xl
              bg-[#36B9CB]
              text-white
              font-semibold
              hover:bg-[#2fa6b6]
              transition
            "
          >
            Book Itinerary →
          </button>
        </div>
      </div>
    </div>
  );
}
