"use client";

import LocationsSelection from "@/components/custom-itinerary-ui/LocationsSelection";
import { useCustomerDetailsStore } from "@/store/custom-itinerary.store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CustomSummary() {
  const router = useRouter();
  const customerDetails = useCustomerDetailsStore(
    (state) => state.customerDetails
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !customerDetails) {
      router.push("/itinerary");
    }
  }, [hydrated, customerDetails, router]);

  if (!hydrated) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!customerDetails) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        py-20
        px-6
      "
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* PAGE TITLE */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Review Your Custom Booking
          </h1>
          <p className="text-white/80 mt-2">
            Please review your details before confirming your itinerary
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ================= BOOKING SUMMARY ================= */}
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#36B9CB] text-center">
              Booking Details
            </h2>

            <hr className="border-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm md:text-base">
              <p>
                <b>Pickup Date:</b>{" "}
                {String(customerDetails.date_of_travel)}
              </p>
              <p>
                <b>Pickup Time:</b>{" "}
                {String(customerDetails.time_for_pickup)}
              </p>
              <p>
                <b>Dropoff Time:</b>{" "}
                {String(customerDetails.time_for_dropoff)}
              </p>
              <p>
                <b>Party Members:</b>{" "}
                {customerDetails.number_of_PAX}
              </p>
              <p>
                <b>Luggage:</b>{" "}
                {customerDetails.number_of_luggage}
              </p>
            </div>

            {/* ID IMAGE */}
            {customerDetails.ID_picture && (
              <div className="pt-4">
                <p className="font-semibold mb-2 text-gray-700">
                  Uploaded ID
                </p>
                <img
                  src={customerDetails.ID_picture}
                  alt="Uploaded ID"
                  className="w-48 rounded-xl shadow-md border"
                />
              </div>
            )}
          </div>

          {/* ================= LOCATIONS ================= */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-extrabold text-[#36B9CB] mb-4 text-center">
              Selected Pit Stops
            </h2>

            <LocationsSelection />
          </div>
        </div>
      </div>
    </section>
  );
}
