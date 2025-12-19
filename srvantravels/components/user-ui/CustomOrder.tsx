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
      className="relative bg-cover bg-center bg-no-repeat py-8 md:py-14 px-4 md:px-6 mb-6"
      style={{
        backgroundImage: "url('/bg-images/bg8.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 space-y-8">

          {/* Header */}
          <div className="border-b-2 border-gray-100 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#36B9CB]">
                Custom Itinerary #{itinerary?.itinerary_ID}
              </h1>

              <div className="bg-[#36B9CB]/10 rounded-2xl px-4 py-3 sm:whitespace-nowrap">
                <p className="text-xs md:text-sm font-semibold text-gray-600 mb-1">
                  Travel Date
                </p>
                <p className="text-lg md:text-xl font-bold text-[#36B9CB]">
                  {String(customer.date_of_travel)}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Booking Details Card */}
            <div className="space-y-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#36B9CB] rounded-full" />
                Booking Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Pickup Time</span>
                  <span className="text-gray-600 text-right">{String(order_details.time_for_pickup)}</span>
                </div>

                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Dropoff Time</span>
                  <span className="text-gray-600 text-right">{String(order_details.time_for_dropoff)}</span>
                </div>

                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Passengers</span>
                  <span className="text-gray-600 font-bold">{customer.number_of_PAX}</span>
                </div>

                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Payment Method</span>
                  <span className="text-gray-600 text-right">{payment.payment_method}</span>
                </div>

                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Payment Status</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                    payment.payment_status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {payment.payment_status}
                  </span>
                </div>

                <div className="flex justify-between items-start py-2">
                  <span className="font-semibold text-gray-700">Booking Status</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                    order_details.status === 'confirmed' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order_details.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Itinerary Stops Card */}
            <div className="space-y-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-8 bg-[#F3B54D] rounded-full" />
                Itinerary Stops
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {stops.length > 0 ? (
                  stops.map((stop, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-[#36B9CB] p-4 rounded-xl hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#36B9CB]/20 rounded-full flex items-center justify-center font-bold text-[#36B9CB]">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base truncate">
                            {stop.locations?.location_name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {stop.locations?.location_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No stops added</p>
                )}
              </div>
            </div>
          </div>

          {/* Download PDF Button */}
          <div className="pt-6 border-t-2 border-gray-100">
            <PDFDownloadLink
              document={<PDFDocument {...props} />}
              fileName="srvan-customitinerary.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm py-3">
                    <div className="w-4 h-4 border-2 border-[#36B9CB] border-t-transparent rounded-full animate-spin" />
                    Preparing your itinerary…
                  </div>
                ) : (
                  <button
                    className="
                      w-full sm:w-auto
                      px-8 py-4 rounded-2xl
                      bg-gradient-to-r from-[#F3B54D] to-[#e5a540]
                      text-white font-bold text-lg
                      shadow-lg
                      hover:shadow-xl
                      hover:-translate-y-1
                      active:translate-y-0
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
