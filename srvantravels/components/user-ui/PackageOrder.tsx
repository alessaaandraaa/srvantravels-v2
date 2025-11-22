import { OrderPayload } from "@/types/order.types";
import { PDFDownloadLink, StyleSheet } from "@react-pdf/renderer";
import PDFDocument from "../others/PDFDoc";

const styles = StyleSheet.create({
  section: { color: "white", textAlign: "center", margin: 30 },
});

export default function PackageOrder(props: OrderPayload) {
  const customer = props;
  const order_details = props.order_details[0];
  const payment = props.payment;
  const itinerary = props.order_details[0].itinerary;
  return (
    <div className="bg-teal-50 border-2 border-teal-900 p-10 rounded-2xl mb-3">
      <div className="flex items-start gap-5">
        <h1 className="text-1xl text-cyan-800 font-bold">
          PACKAGE: {itinerary?.package_itinerary?.package_name}
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
          <p>Pickup Time: N/A</p>
          <p>Dropoff Time: N/A</p>
          <p>Passengers: {customer.number_of_PAX}</p>
          <p>Payment Method: {payment.payment_method}</p>
          <p>Payment Status: {payment.payment_status}</p>
          <p>Booking Status: {order_details.status}</p>
        </div>
        <div>
          <h2>
            <b>Package Details:</b>
          </h2>
          <p>
            <b>Inclusions:</b> {itinerary?.package_itinerary?.inclusions}
          </p>
          <p>
            <b>Route:</b> {itinerary?.package_itinerary?.route}
          </p>
        </div>
      </div>
      <PDFDownloadLink
        document={<PDFDocument {...props} />}
        fileName="srvan-packageitinerary.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <p className="bg-teal-500 rounded-2xl p-1 hover:bg-teal-700 text-white max-w-1/4 font-bold text-center">
              Download your itinerary!
            </p>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
