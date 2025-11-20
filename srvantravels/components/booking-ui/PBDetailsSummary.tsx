"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  usePackageStore,
  useCustomerStore,
} from "@/store/package-itinerary.store";

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
    return <p>Loading...</p>; // wait for Zustand hydration
  }

  if (!customerDetails || customerDetails?.itinerary_id !== Number(params.id)) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="border-amber-600 m-10">
      <h1>BOOKING SUMMARY</h1>
      <hr />
      <p>
        <b>Pickup Date:</b> {String(customerDetails.date_of_travel)}
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
  );
}
