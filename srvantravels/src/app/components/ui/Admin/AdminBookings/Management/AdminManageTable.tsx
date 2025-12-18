"use client";

import { DataTable } from "@/src/app/components/ui/Admin/AdminBookings/Management/data-table";
import { getColumns, Order, Driver, Van } from "./columns";

type Props = {
  data: Order[];
  drivers: Driver[];
  vans: Van[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  setVans: React.Dispatch<React.SetStateAction<Van[]>>;
};

const AdminManageTable = ({
  data,
  drivers,
  vans,
  setDrivers,
  setVans,
}: Props) => {
  return (
    <DataTable
      columns={getColumns(drivers, vans, setDrivers, setVans)}
      data={data}
    />
  );
};

export default AdminManageTable;
