"use client";

import { Customers } from "./AdminHeaderCards";
import { useState, useEffect } from "react";

type customerCount = number;

export default function CustomersWrapper() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`/api/customer`)
      .then((response) => response.json())
      .then((data) => setCount(data.count))
      .catch((err) => console.error(err));
  }, []);

  return <Customers total={count} />;
}
