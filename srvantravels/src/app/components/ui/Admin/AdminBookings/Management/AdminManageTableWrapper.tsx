"use client";

import { useEffect, useState } from "react";
import AdminManageTable from "./AdminManageTable";
import { Order, Driver, Van } from "./columns";

export default function AdminManageTableWrapper() {
  const [data, setData] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vans, setVans] = useState<Van[]>([]);

  useEffect(() => {
    fetch("/api/management-bookings/table")
      .then(res => res.json())
      .then(setData);

    fetch("/api/management-bookings/drivers")
      .then(res => res.json())
      .then(setDrivers);

    fetch("/api/management-bookings/vans")
      .then(res => res.json())
      .then(setVans);
  }, []);

  return (
    <AdminManageTable
      data={data}
      drivers={drivers}
      vans={vans}
      setDrivers={setDrivers}  
      setVans={setVans}
    />
  );
}
