"use client";

import { OrderPayload } from "@/types/order.types";
import { StopsListType } from "@/types/stops.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  twoColumnContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  leftColumn: {
    flexGrow: 0.4,
    paddingRight: 10,
  },

  rightColumn: {
    flexGrow: 0.6,
    paddingLeft: 10,
  },

  itineraryBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
    backgroundColor: "#F7FCFF",
  },

  label: {
    fontWeight: "bold",
  },

  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 10,
    marginBottom: 2,
  },
});

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
  }, [itineraryId]);

  return (
    <View style={styles.twoColumnContainer}>
      {/* LEFT COLUMN: Booking Details */}
      <View style={styles.leftColumn}>
        {/* Detail Header - Remains bold and large */}
        <Text style={styles.headerText}>
          CUSTOM ITINERARY #{order_details.itinerary?.itinerary_ID}
        </Text>

        {/* Travel Date */}
        <Text style={styles.headerText}>
          <Text style={styles.label}>Travel Date:</Text>{" "}
          {String(customer.date_of_travel)}
        </Text>

        <View style={{ margin: 3 }}></View>

        {/* Booking Details Section Header */}
        <Text style={styles.headerText}>Booking Details:</Text>

        {/* 👇 FIX: Use styles.detailText for base style and nested Text for bold label 👇 */}

        <Text style={styles.detailText}>
          <Text style={styles.label}>Pickup Time:</Text>{" "}
          {String(order_details.time_for_pickup)}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Dropoff Time:</Text>{" "}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Passengers:</Text> {customer.number_of_PAX}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Payment Method:</Text>{" "}
          {payment.payment_method}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Payment Status:</Text>{" "}
          {payment.payment_status}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Booking Status:</Text>{" "}
          {order_details.status}
        </Text>
      </View>

      {/* RIGHT COLUMN: ITINERARY STOPS (Structure remains correct) */}
      <View style={styles.rightColumn}>
        <Text style={styles.headerText}>ITINERARY STOPS:</Text>
        {stops.map((stop, index) => (
          <View key={index} style={styles.itineraryBox}>
            <Text style={styles.detailText}>
              {stop.locations?.location_name}
            </Text>
            <Text style={styles.detailText}>
              {stop.locations?.location_address}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
