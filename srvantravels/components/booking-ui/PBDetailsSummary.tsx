"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCustomerStore } from "@/store/package-itinerary.store";

export default function PBDetailsSummary() {
  const params = useParams();
  const router = useRouter();
  const customerDetails = useCustomerStore((state) => state.customerDetails);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (
      hydrated &&
      (!customerDetails || customerDetails?.itinerary_id !== Number(params.id))
    ) {
      router.push("/packages");
    }
  }, [hydrated, customerDetails, params.id, router]);

  if (!hydrated) {
    return <p className="text-center mt-6 text-white">Loading...</p>;
  }

  if (!customerDetails || customerDetails?.itinerary_id !== Number(params.id)) {
    return <p className="text-center mt-6 text-white">Redirecting...</p>;
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        space-y-6
        h-full
      "
    >
      <h2 className="text-2xl font-extrabold text-[#36B9CB]">
        Booking Details
      </h2>

      <div className="space-y-4 text-gray-800 text-sm md:text-base">
        <p className="flex justify-between gap-2">
          <span className="font-semibold text-gray-600">Pickup Date</span>
          <span>{String(customerDetails.date_of_travel)}</span>
        </p>

        <p className="flex justify-between gap-2">
          <span className="font-semibold text-gray-600">
            Party Members
          </span>
          <span>{customerDetails.number_of_PAX}</span>
        </p>

        <p className="flex justify-between gap-2">
          <span className="font-semibold text-gray-600">Luggage</span>
          <span>{customerDetails.number_of_luggage}</span>
        </p>
      </div>

      {customerDetails.ID_picture && (
        <div className="pt-4">
          <p className="font-semibold text-gray-700 mb-2">
            Uploaded ID
          </p>
          <img
            src={customerDetails.ID_picture}
            alt="Uploaded ID"
            className="
              w-40
              rounded-xl
              shadow-md
              border
            "
          />
        </div>
      )}
    </div>
  );
}
