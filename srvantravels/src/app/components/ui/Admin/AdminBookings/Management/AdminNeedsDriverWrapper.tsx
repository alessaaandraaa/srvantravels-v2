"use client";

import { useEffect, useState } from "react";
import { NeedsDriver } from "./AdminManageKPIS";

export default function NeedsDriverWrapper() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/management-bookings/KPIS")
      .then(res => res.json())
      .then(data => setCount(data.needsDriver))
      .catch(console.error);
  }, []);

  return <NeedsDriver total={count} />;
}
