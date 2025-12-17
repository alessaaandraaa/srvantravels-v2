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

export type Driver = {
  driverid: number;
  name: string;
  availability: boolean;
};

export type Van = {
  vanplatenumber: string;
  capacity: number;
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
  vans: Van[]
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
      const [open, setOpen] = React.useState(false);
      const [value, setValue] = React.useState("");
      const router = useRouter();

      return (
        <div className="max-w-[150px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between",
                  value ? "text-green-300" : "text-destructive"
                )}
              >
                {value || "Unassigned"}
                <ChevronDown className="opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search Driver..." />
                <CommandList>
                  <CommandEmpty>No drivers available.</CommandEmpty>
                  <ScrollArea className="h-[150px]">
                    <CommandGroup>
                      {drivers.map((driver) => (
                        <CommandItem
                          key={driver.driverid}
                          value={driver.name}
                          onSelect={async () => {
                            setValue(driver.name);
                            setOpen(false);

                            await fetch(
                              "/api/admin/manage-bookings/assign-driver",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  orderId: row.original.orderid,
                                  driverId: driver.driverid,
                                }),
                              }
                            );

                            router.refresh();
                          }}
                        >
                          {driver.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === driver.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "vanplatenumber",
    header: "Plate Number",
    cell: () => {
      const [open, setOpen] = React.useState(false);
      const [value, setValue] = React.useState("");
      return (
        <div className="max-w-[150px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select Driver"
                className={cn(
                  `w-full justify-between`,
                  value ? "text-green-300" : "text-destructive"
                )}
              >
                {value
                  ? (() => {
                      const driver = vans.find(
                        (d) => d.vanplatenumber === value
                      );
                      if (!driver) return "Unassigned";
                      return driver.vanplatenumber.length > 8
                        ? `${driver.vanplatenumber.substring(0, 8)}...`
                        : driver.vanplatenumber;
                    })()
                  : "Unassigned"}
                <ChevronDown className="opacity-50 flex-shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command
                filter={(value, search) => {
                  const van = vans.find((v) => v.vanplatenumber === value);
                  return van &&
                    String(van.capacity).includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Search Van..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Van Unvailable.</CommandEmpty>
                  <ScrollArea className="h-[150px] mt-4 overflow-y-autos pr-4">
                    <CommandGroup className="flex flex-col gap-4">
                      {vans.map((van) => (
                        <CommandItem
                          key={van.vanplatenumber}
                          value={van.vanplatenumber}
                          keywords={[String(van.capacity)]}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {`${van.capacity} Seats —  ${van.vanplatenumber}`}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === van.vanplatenumber
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const [open, setOpen] = React.useState(false);

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
              <div className="mt-6 flex flex-col gap-1">
                <div className="bg-primary-foreground w-auto h-[120px] rounded-lg"></div>
                {/* 
                        <h2 className="text-lg font-semibold tracking-tight">
                        [Itinerary Booking Request]
                        </h2> */}
                <span className="ml-1 mt-2 text-sm text-muted-foreground">
                  Requested by:{" "}
                  <span className="font-medium text-foreground">
                    Cerydra Lava Hysilens
                  </span>
                </span>
              </div>

              <div className="border-t" />

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-[2px]" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Pick-up Location
                    </span>
                    <span className="font-medium">
                      Ayala Station, Makati City
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-muted-foreground text-[12px]">
                    Stops (up to 12)
                  </span>

                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {[
                      "Rizal Park",
                      "Intramuros",
                      "SM Mall of Asia",
                      "Tagaytay Viewpoint",
                      "Ayala Triangle",
                      "Manila Ocean Park",
                      "Binondo Church",
                      "Fort Santiago",
                      "Greenbelt Park",
                      "National Museum",
                      "Manila Cathedral",
                      "Robinsons Place",
                    ].map((stop, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-[13px] text-foreground before:content-['•'] before:mr-2 before:text-muted-foreground">
                          {stop}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t my-2" />

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Date
                    </span>
                    <span className="font-medium">December 27, 2020</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Number of Party Members
                    </span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Number of Pit Stops
                    </span>
                    <span className="font-medium">4</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Time
                    </span>
                    <span className="font-medium">11:01 PM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Payment Method
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />{" "}
                      Credit Card
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[12px]">
                      Luggages
                    </span>
                    <span className="font-medium">3</span>
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
