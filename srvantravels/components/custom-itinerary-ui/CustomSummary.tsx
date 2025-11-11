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
    return <p>Loading...</p>; // wait for Zustand hydration
  }

  if (!customerDetails) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex items-center">
      <div className="border-amber-600 m-10">
        <h1>BOOKING SUMMARY</h1>
        <hr />
        <p>
          <b>Pickup Date:</b> {String(customerDetails.date_of_travel)}
        </p>
        <p>
          <b>Pickup Time:</b> {String(customerDetails.time_for_pickup)}
        </p>
        <p>
          <b>Dropoff Time:</b> {String(customerDetails.time_for_dropoff)}
        </p>
        <p>
          <b>Number of Party Members:</b> {customerDetails.number_of_PAX}
        </p>
        <p>
          <b>Number of Luggage:</b> {customerDetails.number_of_luggage}
        </p>
        {customerDetails.ID_picture && (
          <div className="mt-4">
            <b>ID Picture:</b>
            <img
              src={customerDetails.ID_picture}
              alt="Uploaded ID"
              className="w-40 h-auto mt-2 rounded shadow"
            />
          </div>
        )}
      </div>
      <LocationsSelection />
    </div>
  );
}
