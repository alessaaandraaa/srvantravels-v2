import { OrderPayload } from "@/types/order.types";
import { itinerary_type } from "@prisma/client";
import PackageOrder from "./PackageOrder";
import CustomOrder from "./CustomOrder";

export default function Order(props: OrderPayload) {
  const itinerary = props.order_details[0].itinerary;
  return (
    <>
      {itinerary?.type === itinerary_type.PACKAGE && (
        <PackageOrder {...props} />
      )}

      {itinerary?.type === itinerary_type.CUSTOM && <CustomOrder {...props} />}
    </>
  );
}
