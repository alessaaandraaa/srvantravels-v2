"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useCustomerDetailsStore,
  useLocationsStore,
} from "@/store/custom-itinerary.store";
import CustomSummary from "./CustomSummary";

type payment = { payment_method: string };

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

  if (!customerDetails) {
    return <p>Redirecting...</p>;
  }

  async function bookItinerary() {
    const body = {
      payment: {
        payment_method: "PENDING",
        down_payment: 100, //TEMPORARY
        payment_status: "NOT_PAID",
      },
      customer: {
        customer_ID: customerDetails?.customer_id,
        number_of_PAX: Number(customerDetails?.number_of_PAX),
        date_of_travel: customerDetails?.date_of_travel,
        number_of_luggage: Number(customerDetails?.number_of_luggage),
        time_for_pickup: customerDetails?.time_for_pickup,
        time_for_dropoff: customerDetails?.time_for_dropoff,
        ID_PictureB64: customerDetails?.ID_picture,
      },
      itinerary: {
        price: 500, //TEMPORARY
        type: "CUSTOM",
      },
      locations,
    };

    const response = await fetch("/api/custom-itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.ok) {
      router.push("/home");
    } else {
      console.error("Order failed.");
    }
  }

  return (
    <div>
      <CustomSummary />
      <button
        onClick={bookItinerary}
        className="rounded-2xl p-2 bg-teal-400 text-white hover:bg-teal-800"
      >
        BOOK ITINERARY
      </button>
    </div>
  );
}
