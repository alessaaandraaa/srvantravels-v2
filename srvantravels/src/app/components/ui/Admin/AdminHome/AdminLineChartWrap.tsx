"use client";

import AdminLineChart from "./AdminLineChart";
import { useState, useEffect } from "react";

type MonthlyStat = {
  month: string;
  accepted: number;
  rejected: number;
};

export default function AdminLineChartWrapper() {
  const [stats, setStats] = useState<MonthlyStat[]>([]);

  useEffect(() => {
    fetch(`/api/orders/monthly?year=2025`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.monthlyStats) {
          setStats(responseData.monthlyStats);
        } else {
          setStats([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return <AdminLineChart data={stats} />;
}
