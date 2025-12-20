"use client";

import LocationsSelection from "@/components/custom-itinerary-ui/LocationsSelection";
import { useCustomerDetailsStore } from "@/store/custom-itinerary.store";

export default function CustomSummary() {
  const customerDetails = useCustomerDetailsStore(
    (state) => state.customerDetails
  );

  if (!customerDetails) return null;

  return (
    <div className="space-y-12">
      {/* TITLE */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#36B9CB]">
          Review Your Custom Booking
        </h1>
        <p className="text-gray-200 mt-2">
          Please review your details before confirming your itinerary
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* BOOKING DETAILS */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#36B9CB] text-center">
            Booking Details
          </h2>

          <hr />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
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
              <b>Party Members:</b> {customerDetails.number_of_PAX}
            </p>
            <p>
              <b>Luggage:</b> {customerDetails.number_of_luggage}
            </p>
          </div>

          {customerDetails.ID_picture && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">
                Uploaded ID
              </p>
              <img
                src={customerDetails.ID_picture}
                alt="Uploaded ID"
                className="w-48 rounded-xl shadow border"
              />
            </div>
          )}
        </div>

        {/* LOCATIONS */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-extrabold text-[#36B9CB] mb-4 text-center">
            Selected Pit Stops
          </h2>

          <LocationsSelection />
        </div>
      </div>
    </div>
  );
}
