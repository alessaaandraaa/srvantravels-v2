import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import OrderSelect from "./UserOrderSelect";
import { Session } from "next-auth";

export default async function OrderSelectServer() {
  const session = await getServerSession(authOptions);
  return <OrderSelect session={session} />;
}
