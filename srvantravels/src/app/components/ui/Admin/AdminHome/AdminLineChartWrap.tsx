import AdminLineChart from "./AdminLineChart";
import { getAcceptedRejectedPerMonth } from "../../../../../../lib/dashboard";

export default async function AdminLineChartWrapper() {
  const data = await getAcceptedRejectedPerMonth(2025);
  return <AdminLineChart data={data} />;
}
