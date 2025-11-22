import { ColumnDef } from "@tanstack/react-table";

export type orderSummary = {
    orderid: Number;
    username: string;
    type: "Custom" | "Package";
    revenue: Number;
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


