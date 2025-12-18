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
import { Label } from "../../../../../../components/ui/label";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";

export type packageItinerary = {
  id : Number;
  name: string;
  price?: number | null;
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
  cell: ({ row }) => {
    const pkg = row.original;

    const [open, setOpen] = useState(false);
    const [routes, setRoutes] = useState<string[]>([]);
    const [routeInput, setRouteInput] = useState("");

    const [inclusions, setInclusions] = useState<string[]>([]);
    const [inclusionInput, setInclusionInput] = useState("");

    const addRoute = () => {
      if (!routeInput.trim()) return;
      setRoutes(prev => [...prev, routeInput.trim()]);
      setRouteInput("");
    };

    const addInclusion = () => {
      if (!inclusionInput.trim()) return;
      setInclusions(prev => [...prev, inclusionInput.trim()]);
      setInclusionInput("");
    };

    return (
      <div className="w-[50px]">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            View more info
          </SheetTrigger>

          <SheetContent className="overflow-y-auto p-4">
            <SheetHeader>
              <SheetTitle>Edit Package</SheetTitle>
              <SheetDescription>
                Update package details below.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">

              {/* Package Name */}
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Input placeholder="Enter package name" defaultValue={pkg.name} />
              </div>

              {/* Passenger Count */}
              <div className="space-y-2">
                <Label>Passenger Count</Label>
                <Input type="number" placeholder="e.g. 20" />
              </div>

              {/* Price per PAX */}
              <div className="space-y-2">
                <Label>Price per PAX</Label>
                <Input type="number" placeholder="₱ price" defaultValue={pkg.price ?? undefined} />
              </div>

              {/* ROUTE SECTION */}
              <div className="space-y-2">
                <Label>Route</Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter route"
                    value={routeInput}
                    onChange={(e) => setRouteInput(e.target.value)}
                  />
                  <Button onClick={addRoute}>Add</Button>
                </div>

                <ScrollArea className="h-24 w-full rounded-md border p-2">
                  {routes.length === 0 && (
                    <p className="text-sm text-muted-foreground">No routes added.</p>
                  )}

                  <ul className="space-y-1">
                    {routes.map((r, i) => (
                      <li key={i} className="text-sm flex justify-between">
                        {r}
                        <button
                          className="text-red-500 text-xs"
                          onClick={() => setRoutes(routes.filter((_, idx) => idx !== i))}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              {/* INCLUSIONS SECTION */}
              <div className="space-y-2">
                <Label>Inclusions List</Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter inclusion"
                    value={inclusionInput}
                    onChange={(e) => setInclusionInput(e.target.value)}
                  />
                  <Button onClick={addInclusion}>Add</Button>
                </div>

                <ScrollArea className="h-24 w-full rounded-md border p-2">
                  {inclusions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No inclusions added.</p>
                  )}

                  <ul className="space-y-1">
                    {inclusions.map((item, i) => (
                      <li key={i} className="text-sm flex justify-between">
                        {item}
                        <button
                          className="text-red-500 text-xs"
                          onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter package description..." />
              </div>

              {/* Attach Image */}
              <div className="space-y-2">
                <Label>Attach Image</Label>
                <Input type="file" accept="image/*" />
              </div>

              {/* Footer */}
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button>Save Changes</Button>
              </div>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }
}

]


