"use client"

import { DataTable } from "@/app/components/ui/Admin/AdminBookings/Management/data-table";
import { getColumns, Order } from "./columns";

const getData = async (): Promise<Order[]> => {
    return [
    {
        paymentstatus: "FULLY PAID",
        orderid: 1001,
        name: "Cerydra Lava Hysilens",
        type: "Custom",
        date: "2025-01-23",
        driver: "John Dela Cruz",
        vanplatenumber: "VNZ-1423",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1002,
        name: "Erika Lave",
        type: "Package",
        date: "2025-01-23",
        driver: "Marcos Reyes",
        vanplatenumber: "ABG-2325",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1003,
        name: "Theo Velar",
        type: "Custom",
        date: "2025-01-23",
        driver: "—",
        vanplatenumber: "—",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1004,
        name: "Luna Ysabel",
        type: "Package",
        date: "2025-01-23",
        driver: "Jillian Cruz",
        vanplatenumber: "NVD-8742",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1005,
        name: "Juno Saren",
        type: "Custom",
        date: "2025-01-23",
        driver: "—",
        vanplatenumber: "—",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1004,
        name: "Luna Ysabel",
        type: "Package",
        date: "2025-01-23",
        driver: "Jillian Cruz",
        vanplatenumber: "NVD-8742",
    },  
    {
        paymentstatus: "NOT PAID",
        orderid: 1005,
        name: "Juno Saren",
        type: "Custom",
        date: "2025-01-23",
        driver: "—",
        vanplatenumber: "—",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1004,
        name: "Luna Ysabel",
        type: "Package",
        date: "2025-01-23",
        driver: "Jillian Cruz",
        vanplatenumber: "NVD-8742",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1005,
        name: "Juno Saren",
        type: "Custom",
        date: "2025-01-23",
        driver: "—",
        vanplatenumber: "—",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1004,
        name: "Luna Ysabel",
        type: "Package",
        date: "2025-01-23",
        driver: "Jillian Cruz",
        vanplatenumber: "NVD-8742",
    },
    {
        paymentstatus: "NOT PAID",
        orderid: 1005,
        name: "Juno Saren",
        type: "Custom",
        date: "2025-01-23",
        driver: "—",
        vanplatenumber: "—",
    },
    ];
}

const drivers = [
  {
    driverid: 1,
    name: "John Dela Cruz",
    availability: true,
  },
  {
    driverid: 2,
    name: "Maria Santos",
    availability: false,
  },
  {
    driverid: 3,
    name: "Luis Ramirez",
    availability: true,
  },
  {
    driverid: 4,
    name: "Carla Mendoza",
    availability: true,
  },
  {
    driverid: 5,
    name: "Cirakd",
    availability: false,
  },
  {
    driverid: 3,
    name: "Maria",
    availability: true,
  },
  {
    driverid: 4,
    name: "Aglaea Mendoza",
    availability: true,
  },
  {
    driverid: 5,
    name: "Ciphera Velasco",
    availability: false,
  },
]

const vans = [
  {
    vanplatenumber: "ABC-1234",
    capacity: 10,
  },
  {
    vanplatenumber: "DEF-5678",
    capacity: 10,
  },
  {
    vanplatenumber: "GHI-9012",
    capacity: 14,
  },
  {
    vanplatenumber: "JKL-3456",
    capacity: 10,
  },
  {
    vanplatenumber: "MNO-7890",
    capacity: 15,
  },
]

const AdminManageTable = async () => {
    const data = await getData();
    return (
         <div className="">
            <div className="px-2 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">All Payments</h1> 
            </div>
            <DataTable columns={getColumns(drivers,vans)} data={data}/>
         </div>
    )
}

export default AdminManageTable;