import { OrderPayload } from "@/types/order.types";
import { ITINERARY_TYPES } from "@/types/db.types";
import {
  Page,
  Text,
  View,
  Document,
  Font,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import PackagePDF from "./PackagePDF";
import CustomPDF from "./CustomPDF";

Font.register({
  family: "Montserrat",
  src: "/fonts/Montserrat-Bold.ttf",
});

const styles = StyleSheet.create({
  horizontalLine: {
    width: "80%",
    height: 1,
    backgroundColor: "#888888",
    marginVertical: 2,
    marginHorizontal: "auto",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    height: 20,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 5,
  },
});

export default function PDFDocument(props: OrderPayload) {
  const itinerary = props.order_details[0].itinerary;
  return (
    <Document>
      <Page size="A4">
        <View style={{ alignItems: "center", margin: 35, marginBottom: 5 }}>
          <Image
            src="/images/srvanlogo2.png"
            style={{ width: 125, height: 125, marginBottom: 1 }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              marginTop: 2,
              fontFamily: "Montserrat",
              textAlign: "center",
              marginBottom: 1,
            }}
          >
            YOUR SRVANTRAVELS ITINERARY
          </Text>
        </View>
        <View style={styles.horizontalLine}></View>
        {itinerary?.type === ITINERARY_TYPES.PACKAGE ? (
          <PackagePDF {...props} />
        ) : (
          <CustomPDF {...props} />
        )}
        <View style={styles.footer}>
          <Text>© {new Date().getFullYear()} SRVANTRAVELS</Text>
          <Text>
            Contact us - Facebook: SR Van Travels | Email:
            srvantravels@gmail.com | Phone: 09452866649
          </Text>
        </View>
      </Page>
    </Document>
  );
}
