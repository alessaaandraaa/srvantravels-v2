"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCustomerStore } from "@store/package-itinerary.store";
import Link from "next/link";

import PBDetailsSummary from "./PBDetailsSummary";
import PBPackageDisplay from "./PBPackageDisplay";

type payment = {
  payment_method: string;
};

export default function PBSummaryDetails() {
  const params = useParams();
  const router = useRouter();
  const customerDetails = useCustomerStore((state) => state.customerDetails);
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  if (!customerDetails || customerDetails?.itinerary_id !== Number(params.id)) {
    return <p>Redirecting...</p>;
  }

  const { register, handleSubmit } = useForm<payment>();

  const onSubmit = async (FormData: payment) => {
    const payment_method = FormData.payment_method;
    const body = {
      payment: {
        payment_method,
        down_payment: 100, //TEMPORARY
        payment_status: "NOT_PAID",
      },
      customer: {
        customer_ID: customerDetails.customer_id,
        number_of_PAX: Number(customerDetails.number_of_PAX),
        date_of_travel: customerDetails.date_of_travel,
        number_of_luggage: Number(customerDetails.number_of_luggage),
        ID_PictureB64: customerDetails.ID_picture,
      },
    };

    const response = await fetch("/api/booking-package", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Response: ", data);

    if (response.ok) {
      router.push(
        `/packages/${params.id}/booking/end?order_id=${data.order_ID}`
      );
    } else {
      setErrorMessage("Order failed.");
      console.error("Order failed.");
    }
  };

  return (
    <>
      <PBDetailsSummary />
      <PBPackageDisplay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="payment_method">Payment Method:</label>
        <select id="payment_method" {...register("payment_method")}>
          <option value="GCASH">GCash</option>
          <option value="CASH">Pay on Pickup</option>
        </select>
        <input type="submit" value="Complete Booking" />
      </form>
    </>
  );
}
