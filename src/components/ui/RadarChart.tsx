"use client"

import React from "react"
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

// Define the shape of the data expected by the chart
interface RadarChartDataPoint {
  subject: string // Category name
  score: number // User's score for this category (e.g., average percentage)
  fullMark: number // Maximum possible score (usually 100)
}

interface RadarChartProps {
  data: RadarChartDataPoint[]
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-white/70">
        No performance data available.
      </div>
    )
  }

  return (
    // Adjust height in the ResponsiveContainer below as needed
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#4b5563" /> {/* Grid line color */}
        <PolarAngleAxis
          dataKey="subject"
          stroke="#cbd5e1" // Axis label color
          tick={{ fill: "#cbd5e1", fontSize: 14 }} // Tick label style
        />
        <PolarRadiusAxis
          angle={30} // Angle for the radius labels
          domain={[0, 100]} // Assuming scores are percentages
          stroke="#6b7280" // Radius axis line color
          tick={{ fill: "#9ca3af", fontSize: 12 }} // Radius tick label style
        />
        <Radar
          name="Performance" // Name shown in tooltip
          dataKey="score"
          stroke="#818cf8" // Line color (indigo-400)
          fill="#818cf8" // Fill color (indigo-400)
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937", // bg-gray-800
            borderColor: "#374151", // border-gray-700
            borderRadius: "0.5rem",
          }}
          itemStyle={{ color: "#e5e7eb" }} // text-gray-200
          labelStyle={{ color: "#f9fafb" }} // text-gray-50
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}

export default RadarChart
