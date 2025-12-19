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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-bold text-[#36B9CB]">
            {itinerary?.package_itinerary?.package_name}
          </h3>
          <div className="bg-[#36B9CB]/10 rounded-lg px-4 py-2">
            <p className="text-sm font-semibold text-[#36B9CB]">
              Travel Date: {String(customer.date_of_travel)}
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Details */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <span className="w-1 h-6 bg-[#36B9CB] rounded-full" />
            Booking Details
          </h4>
          <div className="space-y-3 ml-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Passengers</span>
              <span className="font-bold text-gray-800">{customer.number_of_PAX}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Payment Method</span>
              <span className="text-gray-800">{payment.payment_method}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Payment Status</span>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                payment.payment_status === 'Completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {payment.payment_status}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 font-medium">Booking Status</span>
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

        {/* Package Details */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <span className="w-1 h-6 bg-[#F3B54D] rounded-full" />
            Package Details
          </h4>
          <div className="space-y-4 ml-3">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Inclusions</p>
              <p className="text-gray-700">{itinerary?.package_itinerary?.inclusions}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Route</p>
              <p className="text-gray-700">{itinerary?.package_itinerary?.route}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="pt-6 border-t border-gray-200">
        <PDFDownloadLink
          document={<PDFDocument {...props} />}
          fileName="srvan-packageitinerary.pdf"
        >
          {({ loading }) =>
            loading ? (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-[#36B9CB] border-t-transparent rounded-full animate-spin" />
                <p>Preparing document...</p>
              </div>
            ) : (
              <button className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F3B54D] to-[#eaa93f] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Download Your Itinerary
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
