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
    return <p className="text-center mt-6">Loading...</p>;
  }

  if (!customerDetails || customerDetails?.itinerary_id !== Number(params.id)) {
    return <p className="text-center mt-6">Redirecting...</p>;
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8 md:p-10
        space-y-6
      "
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#36B9CB] text-center">
        BOOKING SUMMARY
      </h1>

      <hr className="border-gray-300" />

      <div className="space-y-3 text-gray-800 text-sm md:text-base">
        <p>
          <span className="font-semibold">Pickup Date:</span>{" "}
          {String(customerDetails.date_of_travel)}
        </p>

        <p>
          <span className="font-semibold">Number of Party Members:</span>{" "}
          {customerDetails.number_of_PAX}
        </p>

        <p>
          <span className="font-semibold">Number of Luggage:</span>{" "}
          {customerDetails.number_of_luggage}
        </p>
      </div>

      {/* ID IMAGE */}
      {customerDetails.ID_picture && (
        <div className="pt-4">
          <p className="font-semibold mb-2">Uploaded ID</p>
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
  );
}
