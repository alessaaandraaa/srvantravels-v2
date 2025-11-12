import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Confirmation from "@/components/booking-ui/Confirmation";

type Search = { order_id?: string };

export default async function End({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const session = await getServerSession(authOptions);
  const { order_id } = await searchParams;

  if (!session?.user) {
    return <p>Session ended. Please log in again.</p>;
  }

  return (
    <div>
      <Confirmation orderId={Number(order_id)} />
    </div>
  );
}
