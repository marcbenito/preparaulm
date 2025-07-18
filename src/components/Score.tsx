import React from "react"
import { cn } from "@/lib/utils"

export interface ScoreProps {
  value: number | null
  showPercent?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Score({
  value,
  showPercent = true,
  className,
  size = "md",
}: ScoreProps) {
  if (value === null) {
    return (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs text-muted-foreground">
        N/A
      </span>
    )
  }

  const getColorStyle = (score: number) => {
    if (score >= 75) return "bg-green-500/20 text-green-400"
    if (score >= 55) return "bg-yellow-500/20 text-yellow-400"
    return "bg-red-500/20 text-red-400"
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-1.5 py-0.5 text-xs"
      case "lg":
        return "px-3 py-1 text-sm"
      case "md":
      default:
        return "px-2.5 py-0.5 text-xs"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        getSizeClasses(),
        getColorStyle(value),
        className,
      )}
    >
      {value}
      {showPercent ? "%" : ""}
    </span>
  )
}
