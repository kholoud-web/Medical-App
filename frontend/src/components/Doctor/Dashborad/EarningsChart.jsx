import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", salary: 3000 },
  { month: "February", salary: 2000 },
  { month: "March", salary: 2800 },
  { month: "April", salary: 500 },
  { month: "May", salary: 1000 },
  { month: "June", salary: 3300 },
];

const chartConfig = {
  salary: { label: "Salary", color: "var(--chart-1)" },
};

function EarningsChart({ type, filling = "true" }) {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0 , top: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#1F3A70" stopOpacity={1} />
                <stop offset="95%" stopColor="#C6D8FD" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={3}
              tickFormatter={(v) => v.slice(0, 3)}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={3} />

            {/* <Tooltip /> */}
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
              cursor={false}
            />
            <Area
              dataKey="salary"
              type={type}
              fill={filling ? "url(#salaryGradient)" : "none"}
              stroke="#207EFF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
}

export default EarningsChart;
