import React from "react"
import { ArrowUp, ArrowDown } from "@/components/ui/icons"

interface ImprovementIndicatorProps {
  currentScore: number
  previousAverage: number
  showIndicator: boolean
}

export function ImprovementIndicator({
  currentScore,
  previousAverage,
  showIndicator,
}: ImprovementIndicatorProps) {
  if (!showIndicator || previousAverage === 0) {
    return null
  }

  const changePercentage = ((currentScore - previousAverage) / previousAverage) * 100
  const isImprovement = changePercentage > 0
  const formattedChange = Math.round(Math.abs(changePercentage))
  const sign = isImprovement ? '+' : '-'

  return (
    <div className="inline-flex items-center gap-1 ml-2">
      <span className={`text-sm font-medium ${isImprovement ? 'text-emerald-400' : 'text-rose-400'}`}>
        {sign}{formattedChange}
      </span>
      {isImprovement ? (
        <ArrowUp 
          className="w-4 h-4 text-emerald-400" 
          aria-label={`Mejora del ${formattedChange}%`}
        />
      ) : (
        <ArrowDown 
          className="w-4 h-4 text-rose-400" 
          aria-label={`Empeoramiento del ${formattedChange}%`}
        />
      )}
    </div>
  )
} 