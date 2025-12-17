"use client";

import { useEffect, useState } from "react";
import { NeedsVan } from "./AdminManageKPIS";

export default function NeedsVanWrapper() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/management-bookings/KPIS")
      .then(res => res.json())
      .then(data => setCount(data.needsVan))
      .catch(console.error);
  }, []);

  return <NeedsVan total={count} />;
}
