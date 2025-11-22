"use client"

import { useState } from "react";
import { CalendarDays, TrendingUp, UsersRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import { Badge } from "../badge";
import { Dialog, DialogContent } from "../dialog";
import { DataTable } from "./data-table";
import { getColumns,orderSummary } from "./columns";    

const data: orderSummary[] = [      
  {
    orderid: 1001,
    username: "Erika Lave",
    type: "Custom",
    revenue: 12500,
  },
  {
    orderid: 1002,
    username: "John Cruz",
    type: "Package",
    revenue: 18200,
  },
  {
    orderid: 1003,
    username: "Alyssa Morales",
    type: "Custom",
    revenue: 9400,
  },
  {
    orderid: 1004,
    username: "Daniel Reyes",
    type: "Package",
    revenue: 22300,
  },
  {
    orderid: 1005,
    username: "Cliff Hysilens",
    type: "Custom",
    revenue: 15750,
  },
  {
    orderid: 1003,
    username: "Alyssa Morales",
    type: "Custom",
    revenue: 9400,
  },
  {
    orderid: 1004,
    username: "Daniel Reyes",
    type: "Package",
    revenue: 22300,
  },
  {
    orderid: 1005,
    username: "Cliff Hysilens",
    type: "Custom",
    revenue: 15750,
  },
]

const AdminMonthlySummary = () => {
    const [selectedYear, setSelectedYear] = useState(2025);
    const [open, openState] = useState(false);

    return (
        <div className="flex flex-col p-4 gap-4">
            <Select onValueChange={(val) => setSelectedYear(Number(val))}>
                <SelectTrigger>For the Month of {selectedYear}</SelectTrigger>
                <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
            </Select>
            <div className="grid grid-cols-4 lg:cols-4 2xl:cols-4 gap-4">
                <Dialog open={open} onOpenChange={openState}>
                    <Card onClick={() => openState(true)} className="w-full max-w-sm border border-border/60 hover:shadow-md transition-all duration-200">
                        <CardHeader className="flex flex-col items-start gap-2 pb-2">
                            <div className="flex items-center justify-between w-full">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    January 2025
                                </CardTitle>
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 text-emerald-500" /> +5.4%
                                </Badge>
                            </div>
                            <CardDescription className="text-sm text-muted-foreground">
                                Monthly performance overview
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Bookings Completed</span>
                                <span className="text-lg font-semibold text-foreground">142</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Total Revenue</span>
                                <span className="text-lg font-semibold text-foreground flex items-center gap-1">
                                    ₱ 218,000
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Avg. / Booking</span>
                                <span className="text-lg font-semibold text-foreground">₱ 1,535</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Total Clients</span>
                                <span className="text-lg font-semibold text-foreground flex items-center gap-1">
                                    <UsersRound className="h-4 w-4 text-blue-500" /> 117
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <DialogContent className="h-[380px] w-[9200px] bg-primary-foreground p-4">
                        <div className="mt-8">
                            <DataTable columns={getColumns()} data={data}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default AdminMonthlySummary;