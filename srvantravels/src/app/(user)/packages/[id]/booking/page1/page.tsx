import PB1 from "../../../../../../../components/booking-ui/PB1";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function BookingPackage1() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  return <PB1 user_id={id} />;
}
