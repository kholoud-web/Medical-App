import { TrendingUp } from "lucide-react"
import { Pie, PieChart, LabelList } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { method: "bank", value: 275, fill: "#4682FA" },
  { method: "credit", value: 200, fill: "#C6D8FD" },
]

const chartConfig = {
  value: {
    label: "Payments",
  },
  bank: {
    label: "Bank Transfer",
    color: "var(--chart-1)",
  },
  credit: {
    label: "Credit Card",
    color: "var(--chart-2)",
  },
}

export default function PieChar() {
  return (
    <Card className="flex flex-col h-64 w-full bg-treat-bg-Gray border-none shadow-none">

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-foreground mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="method"
              stroke="none"
            >
              <LabelList
                dataKey="method"
                stroke="none"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
