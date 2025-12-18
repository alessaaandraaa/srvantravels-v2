"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "../../../../../../../lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/Admin/dropdown-menu";
import {
  Check,
  ChevronDown,
  CreditCard,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type Driver = {
  driverid: number;
  name: string;
  availability: boolean;
};

export type Van = {
  vanplatenumber: string;
  capacity: number;
  available: boolean;
};


export type Order = {
  paymentstatus: "FULLY PAID" | "NOT PAID" | "PARTIALLY PAID";
  orderid: number;
  name: string;
  type: "Package" | "Custom";
  date: string;
  driver: string;
  vanplatenumber: string;
};

export const getColumns = (
  drivers: Driver[],
  vans: Van[],
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>,
  setVans: React.Dispatch<React.SetStateAction<Van[]>>
): ColumnDef<Order>[] => [
  {
    accessorKey: "paymentstatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentstatus");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === "FULLY PAID" && "bg-green-500/40",
            status === "NOT PAID" && "bg-red-500/40",
            status === "PARTIALLY PAID" && "bg-orange-500/40"
          )}
        >
          {status as string}
        </div>
      );
    },
  },
  {
    accessorKey: "orderid",
    header: "Order ID",
  },
  {
    accessorKey: "name",
    header: "Client Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const router = useRouter();
      const assigned = row.original.driver;

      if (assigned && assigned !== "—") {
        return <Button
                variant="outline"
                role="combobox"
                className= "w-[145px] justify-between text-green-300"
          >
                {row.original.driver !== "—"
                  ? row.original.driver
                  : "Unassigned"}
                <ChevronDown className="opacity-50" />
          </Button>;
      }

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[145px] justify-between text-destructive"
            >
              Unassigned
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Driver..." />
              <CommandList>
                <CommandEmpty>No drivers available.</CommandEmpty>

                <ScrollArea className="h-[150px]">
                  <CommandGroup>
                    {drivers
                      .filter(d => d.availability) 
                      .map(driver => (
                        <CommandItem
                          key={driver.driverid}
                          value={driver.name}
                          onSelect={async () => {
                            row.original.driver = driver.name;

                            setDrivers(prev =>
                              prev.map(d =>
                                d.driverid === driver.driverid
                                  ? { ...d, availability: false }
                                  : d
                              )
                            );

                            await fetch(
                              "/api/management-bookings/assign-driver",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  orderId: row.original.orderid,
                                  driverId: driver.driverid,
                                }),
                              }
                            );
                            toast.success(`${driver.name} assigned`);

                            router.refresh();
                          }}
                        >
                          {driver.name}
                          <Check className="ml-auto" />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "vanplatenumber",
    header: "Plate Number",
    cell: ({ row }) => {
      const router = useRouter();
      const assignedVan = row.original.vanplatenumber;

      if (assignedVan && assignedVan !== "—") {
        return (
          <Button
                variant="outline"
                role="combobox"
                className= "w-[120px] justify-between text-green-300"
          >
                {row.original.vanplatenumber}
                <ChevronDown className="opacity-50" />
          </Button>
        );
      }

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[120px] justify-between text-destructive"
            >
              Unassigned
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[220px] p-0">
            <Command>
              <CommandInput placeholder="Search Van..." />
              <CommandList>
                <CommandEmpty>No vans available.</CommandEmpty>

                <ScrollArea className="h-[150px]">
                  <CommandGroup>
                    {vans
                      .filter(v => v.available)
                      .map(van => (
                        <CommandItem
                          key={van.vanplatenumber}
                          value={van.vanplatenumber}
                          onSelect={async () => {
                            row.original.vanplatenumber = van.vanplatenumber;

                            setVans(prev =>
                              prev.map(v =>
                                v.vanplatenumber === van.vanplatenumber
                                  ? { ...v, available: false }
                                  : v
                              )
                            );

                            await fetch(
                              "/api/management-bookings/assign-van",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  orderId: row.original.orderid,
                                  plateNumber: van.vanplatenumber,
                                }),
                              }
                            );

                            router.refresh();
                          }}
                        >
                          {`${van.capacity} Seats — ${van.vanplatenumber}`}
                          <Check className="ml-auto" />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const [open, setOpen] = React.useState(false);

      const [details, setDetails] = React.useState<any>(null);

      React.useEffect(() => {
        if (!open) return;

        fetch(`/api/management-bookings/order/${order.orderid}`)
          .then(res => res.json())
          .then(setDetails);
      }, [open]);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(order.orderid.toString())
                }
              >
                Copy Order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                View Full Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="w-[88vw] h-[80vh] max-w-none rounded-md overflow-y-auto">
            <div className="flex flex-col gap-4 rounded-lg">
              {/* TOP BANNER — KEEP EMPTY */}
              <div className="mt-6 flex flex-col gap-1">
                <div className="bg-primary-foreground w-auto h-[120px] rounded-lg"></div>

                <span className="ml-1 mt-2 text-sm text-muted-foreground">
                  Requested by:{" "}
                  <span className="font-medium text-foreground">
                    {details?.clientName ?? "—"}
                  </span>
                </span>
              </div>

              <div className="border-t" />

              {/* MAIN INFO */}
              <div className="space-y-3 text-sm">
                {/* PICKUP */}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-[2px]" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Pick-up Location
                    </span>
                    <span className="font-medium">
                      {details?.stops?.[0]?.name ?? "—"}
                    </span>
                  </div>
                </div>

                {/* STOPS */}
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-muted-foreground text-[12px]">
                    Stops ({details?.stops?.length ?? 0})
                  </span>

                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {details?.stops?.length ? (
                      details.stops.map((stop: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <span className="text-[13px] text-foreground before:content-['•'] before:mr-2 before:text-muted-foreground">
                            {stop.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No stops available</span>
                    )}
                  </div>
                </div>

                <div className="border-t my-2" />

                {/* GRID INFO */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">Date</span>
                    <span className="font-medium">
                      {details?.date
                        ? new Date(details.date).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Party Members
                    </span>
                    <span className="font-medium">{details?.pax ?? "—"}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">Driver</span>
                    <span className="font-medium">{details?.driver ?? "Unassigned"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">Time</span>
                    <span className="font-medium">
                      {details?.timePickup ?? "—"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Payment Method
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      {details?.paymentMethod ?? "—"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">Luggage</span>
                    <span className="font-medium">{details?.luggage ?? "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
