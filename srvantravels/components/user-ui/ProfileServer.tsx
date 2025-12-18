import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserProfile from "./Profile";

export default async function UserProfileServer(customer_id: {
  customer_id: number;
}) {
  const session = await getServerSession(authOptions);

  return (
    <UserProfile customer_id={customer_id.customer_id} session={session} />
  );
}
