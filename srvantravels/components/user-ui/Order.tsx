import { OrderPayload } from "@/types/order.types";
import { ITINERARY_TYPES } from "@/types/db.types";
import PackageOrder from "./PackageOrder";
import CustomOrder from "./CustomOrder";

export default function Order(props: OrderPayload) {
  const itinerary = props.order_details[0].itinerary;
  return (
    <>
      {itinerary?.type === ITINERARY_TYPES.PACKAGE && (
        <PackageOrder {...props} />
      )}

      {itinerary?.type === ITINERARY_TYPES.CUSTOM && <CustomOrder {...props} />}
    </>
  );
}
