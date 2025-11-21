import { OrderPayload } from "@/types/order.types";
import { ITINERARY_TYPES } from "@/types/db.types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PackagePDF from "./PackagePDF";
import CustomPDF from "./CustomPDF";

export default function PDFDocument(props: OrderPayload) {
  const itinerary = props.order_details[0].itinerary;
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text style={{ fontSize: 15 }}>YOUR SRVANTRAVELS ITINERARY</Text>
        </View>
        {itinerary?.type === ITINERARY_TYPES.PACKAGE ? (
          <PackagePDF {...props} />
        ) : (
          <CustomPDF {...props} />
        )}
      </Page>
    </Document>
  );
}
