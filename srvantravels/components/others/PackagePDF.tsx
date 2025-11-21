import { OrderPayload } from "@/types/order.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  packageBox: {
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
    textBreakStrategy: "highQuality",
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
    return (
      <Document>
        <Page size="A4">
          <Text style={{ color: "red" }}>
            Error: Order details or itinerary data is missing.
          </Text>
        </Page>
      </Document>
    );
  }

  const itinerary = orderDetail.itinerary;

  return (
    <View style={{ margin: 40, marginTop: 10 }}>
      <View>
        <Text style={styles.headerText}>
          <Text style={styles.label}>PACKAGE:</Text>{" "}
          {itinerary?.package_itinerary?.package_name}
        </Text>
        <Text style={styles.headerText}>
          <Text style={styles.label}>Travel Date:</Text>{" "}
          {String(customer.date_of_travel)}
        </Text>

        <View style={{ margin: 3 }}></View>

        <Text style={styles.headerText}>Booking Details:</Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Pickup Time:</Text>
          {"N/A"}
        </Text>

        <Text style={styles.detailText}>
          <Text style={styles.label}>Dropoff Time:</Text>
          {"N/A"}
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
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headerText}>Package Details:</Text>
        <View style={styles.packageBox}>
          <Text style={styles.headerText}>Inclusions:</Text>
          <Text style={styles.detailText}>
            {itinerary?.package_itinerary?.inclusions}
          </Text>
        </View>
        <View style={styles.packageBox}>
          <Text style={styles.headerText}>Route:</Text>
          <Text style={styles.detailText}>
            {itinerary?.package_itinerary?.route}
          </Text>
        </View>
      </View>
    </View>
  );
}
