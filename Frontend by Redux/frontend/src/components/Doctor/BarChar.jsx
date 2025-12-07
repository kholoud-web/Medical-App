import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis ,YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} 


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

function BarChar() {
  return (
    
    <ChartContainer config={chartConfig}>  
      <BarChart width={285} height={170} data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={3}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              
              tickLine={false}
              tickMargin={3}
              axisLine={false}

            />
            
              <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            

            <Bar dataKey="desktop" fill="#4682FA" radius={4} />
            <Bar dataKey="mobile" fill="#1F3A70" radius={4} />
          </BarChart>
          </ChartContainer>
      
  )
}

export default BarChar