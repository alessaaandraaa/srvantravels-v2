"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "../chart";

const thisYear = new Date().getFullYear();

const chartConfig = {
  accepted: {
    label: "Accepted",
    color: "#2563eb", 
  },
  rejected: {
    label: "Rejected",
    color: "#60a5fa", 
  },
} satisfies ChartConfig;

type ChartData = {
  month: string;
  accepted: number;
  rejected: number;
};

const AdminLineChart = ({ data }: { data: ChartData[] }) => {
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">
        Bookings for This Year ({thisYear})
      </h1>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {/* ACCEPTED */}
          <Area
            dataKey="accepted"
            type="natural"
            fill="url(#fillAccepted)"
            fillOpacity={0.4}
            stroke="var(--chart-1)"
            stackId="a"
          />

          {/* REJECTED */}
          <Area
            dataKey="rejected"
            type="natural"
            fill="url(#fillRejected)"
            fillOpacity={0.4}
            stroke="var(--chart-2)"
            stackId="a"
          />

          <defs>
            <linearGradient id="fillAccepted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-accepted)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-accepted)" stopOpacity={0.1} />
            </linearGradient>

            <linearGradient id="fillRejected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-rejected)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-rejected)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AdminLineChart;
