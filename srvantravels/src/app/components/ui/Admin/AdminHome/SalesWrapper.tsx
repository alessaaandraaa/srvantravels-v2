import { getTotalSales } from "@/services/dashboard-service";
import { Sales } from "./AdminHeaderCards";

export default async function SalesWrapper() {
  const totalSales = await getTotalSales();
  return <Sales total={totalSales} />;
}
