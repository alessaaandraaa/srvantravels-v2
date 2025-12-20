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
        customer_ID: customerDetails.customer_id,
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
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto pb-32">
        <CustomSummary />
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-white/90 backdrop-blur-md border-t shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-end px-6 py-4">
            <button
              onClick={bookItinerary}
              className="
                px-10 py-4
                rounded-2xl
                bg-[#36B9CB]
                text-white
                font-extrabold
                text-lg
                hover:bg-[#2fa6b6]
                transition
              "
            >
              Book Itinerary →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
