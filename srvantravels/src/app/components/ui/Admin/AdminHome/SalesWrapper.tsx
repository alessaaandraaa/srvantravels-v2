"use client";

import { Sales } from "./AdminHeaderCards";
import { useState, useEffect } from "react";

type totalSales = number;

export default function SalesWrapper() {
  const [sales, setSales] = useState(0);

  useEffect(() => {
    fetch(`/api/orders/sales`)
      .then((response) => response.json())
      .then((data) => setSales(data.sales))
      .catch((err) => console.error(err));
  }, []);

  return <Sales total={sales} />;
}
