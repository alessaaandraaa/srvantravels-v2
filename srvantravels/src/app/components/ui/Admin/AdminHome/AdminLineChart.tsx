"use client"

import {Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent, ChartLegendContent, type ChartConfig} from "../chart"

// MAKE THIS FOR LINE CHARTS OF TOTAL BOOKINGS AC

const thisYear = new Date().getFullYear();

const chartConfig = { 
  desktop: {
    label: "Bookings",
    color: "#2563eb",
  },
  mobile: {
    label: "Sales",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 186, mobile: 80 },
  { month: "August", desktop: 305, mobile: 200 },
  { month: "September", desktop: 237, mobile: 120 },
  { month: "October", desktop: 73, mobile: 190 },
  { month: "November", desktop: 209, mobile: 130 },
  { month: "December", desktop: 214, mobile: 140 },
]

const AdminLineChart = () => {
    return (
        <div className="">
            <h1 className="text-lg font-medium mb-6">Total Bookings for Year {thisYear}</h1>
            <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full"> 
                <AreaChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value)=>value.slice(0,3)}/>
                    <YAxis tickLine={false} tickMargin={10} axisLine={false}/>
                    <ChartTooltip content={<ChartTooltipContent/>}/>    
                    <ChartLegend content={<ChartLegendContent/>}/>
                    <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--chart-1)"
                    stackId="a"
                    />
                    <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--chart-2)"
                    stackId="a"
                    />
                    <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="5%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="5%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

export default AdminLineChart;