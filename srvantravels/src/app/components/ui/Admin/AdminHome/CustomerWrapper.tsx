import { getTotalCustomers } from "@/services/dashboard-service";
import { Customers } from "./AdminHeaderCards";

export default async function CustomersWrapper() {
  const customers = await getTotalCustomers();
  return <Customers total={customers} />;
}
