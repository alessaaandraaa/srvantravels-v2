"use client";

import { OrderPayload } from "@/types/order.types";
import { StopsListType } from "@/types/stops.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
/*
    <div className="bg-teal-50 border-2 border-teal-900 p-10 rounded-2xl mb-3">
      <div className="flex items-start gap-5">
        <h1 className="text-1xl text-cyan-800 font-bold">
          CUSTOM ITINERARY #{itinerary?.itinerary_ID}
        </h1>
        <h3>
          {" "}
          <b>Travel Date:</b> {String(customer.date_of_travel)}
        </h3>
      </div>
      <hr />
      <div className="flex items-start gap-5 mt-3">
        <div className="min-w-1/2">
          <h2>
            <b>Booking Details:</b>
          </h2>
          <p>Pickup Time: {String(order_details.time_for_pickup)}</p>
          <p>Dropoff Time: {String(order_details.time_for_dropoff)}</p>
          <p>Passengers: {customer.number_of_PAX}</p>
          <p>Payment Method: {payment.payment_method}</p>
          <p>Payment Status: {payment.payment_status}</p>
          <p>Booking Status: {order_details.status}</p>
        </div>
        <div>
          <h2>
            <b>Itinerary:</b>
          </h2>
          <div>
            {stops.map((stop, index) => (
              <div
                className="bg-white border-1 border-teal-950 p-3 mb-3 rounded-2xl"
                key={index}
              >
                <h1>{stop.locations?.location_name}</h1>
                <p>{stop.locations?.location_address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
*/

export default function CustomPDF(props: OrderPayload) {
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
    // If itineraryId is undefined, the function inside useEffect is skipped,
  }, [itineraryId]);
  return (
    <View>
      <View>
        <Text>CUSTOM ITINERARY #{itinerary?.itinerary_ID}</Text>
        <Text>Travel Date: {String(customer.date_of_travel)}</Text>
      </View>
      <View>
        <Text>Booking Details:</Text>
        <Text>Pickup Time: {String(order_details.time_for_pickup)}</Text>
        <Text>Dropoff Time: {String(order_details.time_for_dropoff)}</Text>
        <Text>Passengers: {customer.number_of_PAX}</Text>
        <Text>Payment Method: {payment.payment_method}</Text>
        <Text>Payment Status: {payment.payment_status}</Text>
        <Text>Booking Status: {order_details.status}</Text>
      </View>
      <View>
        <Text>ITINERARY STOPS:</Text>
        {stops.map((stop, index) => (
          <View key={index}>
            <Text>{stop.locations?.location_name}</Text>
            <Text>{stop.locations?.location_address}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
