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
        py-16
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ================= BOOKING SUMMARY ================= */}
          <div
            className="
              w-full lg:w-[45%]
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              space-y-6
            "
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#36B9CB] text-center">
              BOOKING SUMMARY
            </h1>

            <hr className="border-gray-300" />

            <div className="space-y-3 text-gray-800 text-sm md:text-base">
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
                <b>Number of Party Members:</b>{" "}
                {customerDetails.number_of_PAX}
              </p>
              <p>
                <b>Number of Luggage:</b>{" "}
                {customerDetails.number_of_luggage}
              </p>
            </div>

            {/* ID IMAGE */}
            {customerDetails.ID_picture && (
              <div className="pt-4">
                <p className="font-semibold mb-2">ID Picture</p>
                <img
                  src={customerDetails.ID_picture}
                  alt="Uploaded ID"
                  className="
                    w-44
                    h-auto
                    rounded-xl
                    shadow-md
                    border
                  "
                />
              </div>
            )}
          </div>

          {/* ================= LOCATIONS ================= */}
          <div className="w-full lg:flex-1">
            <LocationsSelection />
          </div>

        </div>
      </div>
    </section>
  );
}
