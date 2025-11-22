"use client"

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../Sidebar/sheet";
import { Button } from "../button";
import { ArrowUpDown, CheckCircle2, ChevronDown, Ellipsis, MoreHorizontal, XCircle } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import { stat } from "fs";

export type packageItinerary = {
  id : Number;
  name: string;
  price: Number;
  status: "Active" | "Inactive";
  createdby: string;
}

export const getColumns = (): ColumnDef<packageItinerary>[] => [
  {
    accessorKey: "createdby",
    header: "Created by",
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Package ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Package Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    header: "Status",
    cell: () => {
      const [status, setStatus] = useState("Inactive");
 
      return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 w-[120px] justify-center rounded-md border transition-colors",
            status === "Active"
              ? "border-emerald-500/60 bg-emerald-100/30 text-emerald-700 hover:bg-emerald-100/50"
              : "border-rose-500/60 bg-rose-100/30 text-rose-700 hover:bg-rose-100/50"
          )}
        >
          {status === "Active" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <XCircle className="h-4 w-4 text-rose-600" />
          )}
          <span className="text-sm font-medium">{status}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[140px]">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Change status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setStatus("Active")}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Active
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setStatus("Inactive")}
          className="flex items-center gap-2"
        >
          <XCircle className="h-4 w-4 text-rose-600" />
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      )
    },
  },
  {
    id: "action1",
    cell: ({row}) => {
      const packageID = row.original.id;
      const [open, openState] = useState(false);

      return (
        <div className="w-[50px]">
          <Sheet>
            <SheetTrigger>View more info...</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
          </Sheet>
        </div>
      )
    }
  }
]


