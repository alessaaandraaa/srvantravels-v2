import { ColumnDef } from "@tanstack/react-table";

export type orderSummary = {
    orderid: number;
    username: string;
    type: "Custom" | "Package";
    revenue: number;
}

export const getColumns = (): ColumnDef<orderSummary>[] => [
  {
    accessorKey: "orderid",
    header: "Order ID",
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
  },
]


