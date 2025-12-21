import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis ,YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  patient: {
    label: "patients",
    color: "var(--chart-1)",
  },
  new: {
    label: "new",
    color: "var(--chart-2)",
  },
} 


const chartData = [
  { month: "January", patient: 186, new: 80 },
  { month: "February", patient: 305, new: 200 },
  { month: "March", patient: 237, new: 120 },
  { month: "April", patient: 73, new: 190 },
  { month: "May", patient: 209, new: 130 },
  { month: "June", patient: 214, new: 140 },
]

function BarChar({data=chartData ,  dataKeyProp="month", className="" , show=true}) {
  return (
    
    <ChartContainer className={`w-full h-full ${className}`} config={chartConfig}>  
      <BarChart data={data} margin={{ left: 0, right: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyProp}
              tickLine={false}
              tickMargin={3}
              axisLine={false}
              tickFormatter={(value) => show? value.slice(0, 3) : value}
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
            

            <Bar dataKey="patient" fill="#4682FA" radius={4} />
           { show && <Bar dataKey="new" fill="#1F3A70" radius={4} />}
          </BarChart>
          </ChartContainer>
      
  )
}

export default BarChar