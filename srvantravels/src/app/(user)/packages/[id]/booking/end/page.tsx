import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Confirmation from "../../../../../components/booking-ui/Confirmation";

export default async function End({ searchParams }: any) {
  const session = await getServerSession(authOptions);
  const order_id = await searchParams.order_id;

  if (!session?.user) {
    return <p>Session ended. Please log in again.</p>;
  }

  return (
    <div>
      <Confirmation orderId={order_id} />
    </div>
  );
}
