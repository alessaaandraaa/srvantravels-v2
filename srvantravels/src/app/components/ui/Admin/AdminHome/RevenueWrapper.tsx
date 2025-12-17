import { getTotalCustomers } from "@/services/dashboard-service";
import { Revenue } from "./AdminHeaderCards";

export default async function RevenueWrapper() {
  const revenue = await getTotalCustomers();
  return <Revenue total={revenue} />;
}
