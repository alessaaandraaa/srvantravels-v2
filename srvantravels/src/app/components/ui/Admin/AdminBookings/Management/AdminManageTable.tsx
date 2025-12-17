"use client";

import { DataTable } from "@/src/app/components/ui/Admin/AdminBookings/Management/data-table";
import { getColumns, Order, Driver, Van } from "./columns";

type Props = {
  data: Order[];
  drivers: Driver[];
  vans: Van[];
};

const AdminManageTable = ({ data, drivers, vans }: Props) => {
  return (
    <div>
      <div className="px-2 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>

      <DataTable columns={getColumns(drivers, vans)} data={data} />
    </div>
  );
};

export default AdminManageTable;
