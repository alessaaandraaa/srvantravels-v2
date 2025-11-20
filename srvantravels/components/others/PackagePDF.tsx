import { OrderPayload } from "@/types/order.types";
import { itinerary_type } from "@prisma/client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function PackagePDF(props: OrderPayload) {
  const customer = props;
  const order_details = props.order_details[0];
  const payment = props.payment;
  const orderDetail = props.order_details?.[0];

  console.log("CUSTOMER: ", customer);
  console.log("ORDER DETAILS: ", order_details);
  console.log("PAYMENT: ", payment);
  console.log("ORDER DETAIL: ", orderDetail);
  if (!orderDetail || !orderDetail.itinerary) {
    // Return a minimal, valid PDF structure with an error message
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={{ color: "red" }}>
            Error: Order details or itinerary data is missing.
          </Text>
        </Page>
      </Document>
    );
  }

  const itinerary = orderDetail.itinerary;

  return (
    <View>
      <View style={styles.section}>
        <Text>PACKAGE: {itinerary?.package_itinerary?.package_name}</Text>
        <Text>Travel Date: {String(customer.date_of_travel)}</Text>
      </View>
      <View style={styles.section}>
        <Text>Booking Details:</Text>
        <Text>Pickup Time: N/A</Text>
        <Text>Dropoff Time: N/A</Text>
        <Text>Passengers: {customer.number_of_PAX}</Text>
        <Text>Payment Method: {payment.payment_method}</Text>
        <Text>Payment Status: {payment.payment_status}</Text>
        <Text>Booking Status: {order_details.status}</Text>
      </View>
      <View style={styles.section}>
        <Text>
          <b>Package Details:</b>
        </Text>
        <Text>Inclusions: {itinerary?.package_itinerary?.inclusions}</Text>
        <Text>Route: {itinerary?.package_itinerary?.route}</Text>
      </View>
    </View>
  );
}
