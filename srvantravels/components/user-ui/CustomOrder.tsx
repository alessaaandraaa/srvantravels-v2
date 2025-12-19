"use client";
import { useState, useEffect } from "react";
import { StopsListType } from "@/types/stops.types";
import { OrderPayload } from "@/types/order.types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/others/PDFDoc";

export default function PackageOrder(props: OrderPayload) {
  const customer = props;
  const order_details = props.order_details[0];
  const payment = props.payment;
  const itinerary = props.order_details[0].itinerary;

  const [stops, setStops] = useState<StopsListType>([]);
  const itineraryId = itinerary?.itinerary_ID;

  useEffect(() => {
    if (itineraryId) {
      fetch(`/api/stops?itineraryId=${itineraryId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json) => {
          setStops(json.orders || []);
        })
        .catch((error) => {
          console.error("Failed to fetch stops:", error);
          setStops([]);
        });
    }
  }, [itineraryId]);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat py-12 px-6 mb-6"
      style={{
        backgroundImage: "url('/bg-images/bg8.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#36B9CB]">
              Custom Itinerary #{itinerary?.itinerary_ID}
            </h1>

            <p className="text-sm font-semibold text-gray-700">
              Travel Date:{" "}
              <span className="font-normal">
                {String(customer.date_of_travel)}
              </span>
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Booking Details */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-800">
                Booking Details
              </h2>

              <p><b>Pickup Time:</b> {String(order_details.time_for_pickup)}</p>
              <p><b>Dropoff Time:</b> {String(order_details.time_for_dropoff)}</p>
              <p><b>Passengers:</b> {customer.number_of_PAX}</p>
              <p><b>Payment Method:</b> {payment.payment_method}</p>
              <p><b>Payment Status:</b> {payment.payment_status}</p>
              <p><b>Booking Status:</b> {order_details.status}</p>
            </div>

            {/* Itinerary Stops */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Itinerary
              </h2>

              <div className="space-y-3">
                {stops.map((stop, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 p-4 rounded-2xl"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {stop.locations?.location_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {stop.locations?.location_address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download PDF */}
          <div className="pt-6">
            <PDFDownloadLink
              document={<PDFDocument {...props} />}
              fileName="srvan-customitinerary.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <p className="text-gray-500 text-sm">
                    Preparing your itinerary…
                  </p>
                ) : (
                  <button
                    className="
                      px-8 py-3 rounded-2xl
                      bg-[#F3B54D]
                      text-white font-bold
                      hover:bg-[#eaa93f]
                      hover:-translate-y-0.5
                      transition-all duration-200
                    "
                  >
                    Download your itinerary
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>

        </div>
      </div>
    </div>
  );
}
