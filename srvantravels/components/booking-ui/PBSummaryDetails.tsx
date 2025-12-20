"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCustomerStore } from "@/store/package-itinerary.store";
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

  const { register, handleSubmit } = useForm<payment>();

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
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  const onSubmit = async (FormData: payment) => {
    const payment_method = FormData.payment_method;

    const body = {
      payment: {
        payment_method,
        down_payment: 100,
        payment_status: "NOT_PAID",
      },
      customer: {
        customer_ID: customerDetails.customer_id,
        number_of_PAX: Number(customerDetails.number_of_PAX),
        date_of_travel: customerDetails.date_of_travel,
        number_of_luggage: Number(customerDetails.number_of_luggage),
        ID_PictureB64: customerDetails.ID_picture,
        itinerary_ID: customerDetails.itinerary_id,
      },
      itinerary: {
        price: 1000,
        type: "PACKAGE",
      },
    };

    const response = await fetch("/api/booking-package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(
        `/packages/${params.id}/booking/end?order_id=${data.order_ID}`
      );
    } else {
      setErrorMessage("Order failed.");
    }
  };

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        px-6
        py-20
      "
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          max-w-6xl
          mx-auto
          space-y-10
        "
      >
        {/* PACKAGE SUMMARY — FULL WIDTH */}
        <PBPackageDisplay />

        {/* DETAILS + PAYMENT */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            items-stretch
          "
        >
          <PBDetailsSummary />

          {/* PAYMENT FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              space-y-6
            "
          >
            <h3 className="text-2xl font-extrabold text-[#36B9CB] text-center">
              Payment Method
            </h3>

            <div className="space-y-2">
              <label
                htmlFor="payment_method"
                className="block text-sm font-semibold text-gray-700"
              >
                Select Payment Option
              </label>

              <select
                id="payment_method"
                {...register("payment_method")}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  text-gray-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#36B9CB]
                "
              >
                <option value="GCASH" className="text-gray-800">
                  GCash
                </option>
                <option value="CASH" className="text-gray-800">
                  Pay on Pickup
                </option>
              </select>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600 text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="
                w-full
                py-3
                rounded-xl
                bg-[#36B9CB]
                text-white
                font-semibold
                hover:bg-[#2fa6b6]
                transition
              "
            >
              Complete Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
