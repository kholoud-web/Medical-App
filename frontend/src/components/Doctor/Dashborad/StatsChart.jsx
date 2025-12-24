import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", "Doctor Diagnoses": 4000, "AI Diagnoses": 2400 },
  { name: "Tue", "Doctor Diagnoses": 3000, "AI Diagnoses": 1398 },
  { name: "Wed", "Doctor Diagnoses": 2000, "AI Diagnoses": 9800 },
  { name: "Thu", "Doctor Diagnoses": 2780, "AI Diagnoses": 3908 },
  { name: "Fri", "Doctor Diagnoses": 1890, "AI Diagnoses": 4800 },
  { name: "Sat", "Doctor Diagnoses": 2390, "AI Diagnoses": 3800 },
  { name: "Sun", "Doctor Diagnoses": 3490, "AI Diagnoses": 4300 },
];


export default function StatsChart() {
  const [hoverKey, setHoverKey] = useState(null);

  const pvOpacity = hoverKey && hoverKey !== "Doctor Diagnoses" ? 0.3 : 1;
  const uvOpacity = hoverKey && hoverKey !== "AI Diagnoses" ? 0.3 : 1;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            onMouseEnter={(e) => setHoverKey(e.dataKey)}
            onMouseLeave={() => setHoverKey(null)}
          />
          <Line
            type="monotone"
            dataKey="Doctor Diagnoses"
            stroke="#82CA9D"
            strokeOpacity={pvOpacity}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="AI Diagnoses"
            stroke="#4682FA"
            strokeOpacity={uvOpacity}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
