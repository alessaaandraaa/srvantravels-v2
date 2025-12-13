"use client"

import React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable, 
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"
import { Button } from "../../../../../components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "../../../../components/ui/Admin/input"
import { AddPackageSheet } from "./AddPackageSheet"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [current, setCurrent] = React.useState(1);
  const table = useReactTable({ 
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: {pageSize:5}},
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), 
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
       
    state: {
      sorting,
      columnFilters,
    },
  })  

  return (
      <div className="">
        <div className="flex items-center py-4 gap-4">
          <Input
            placeholder="Filter Package Name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <AddPackageSheet/>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-center space-x-4 py-4 mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>{ table.previousPage(); setCurrent((current) => current-1) }}
              disabled={!table.getCanPreviousPage()}  
            >
              <ChevronLeft/>
            </Button>
            <div className="text-mute-foreground">
              <div className="flex-1 text-sm text-muted-foreground">
                {current} of{" "} 
                {Math.ceil(table.getFilteredRowModel().rows.length / 5)}
              </div>
            </div>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => {table.nextPage(); setCurrent((current) => current+1)}}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight/>
            </Button>
        </div>
      </div>
  )
}