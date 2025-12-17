"use client";

import { useEffect, useState } from "react";
import { NumberBookingsWeek } from "./AdminManageKPIS";

export default function NumberBookingsWeekWrapper() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/management-bookings/KPIS")
      .then(res => res.json())
      .then(data => setCount(data.bookingsThisWeek))
      .catch(console.error);
  }, []);

  return <NumberBookingsWeek total={count} />;
}
