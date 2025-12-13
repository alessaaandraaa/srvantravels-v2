"use client"

import { ColumnDef } from "@tanstack/react-table";

export type locations = {
  location_name: string,
  location_address: string,
}

export const getColumns = (): ColumnDef<locations>[] => [
  {
    accessorKey: "location_name",
    header: "Location",
  },
  {
    accessorKey: "location_address",
    header: "Address",
  }
]


