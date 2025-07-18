import React from "react"
import { Trophy, Check, TrendingUp } from "@/components/ui/icons"
import { ImprovementIndicator } from "./ImprovementIndicator"

type ResultsSummaryProps = {
  score: number
  correctAnswers: number
  totalQuestions: number
  averageScore: number
  showImprovementIndicator?: boolean
}

export function ResultsSummary({
  score,
  correctAnswers,
  totalQuestions,
  averageScore,
  showImprovementIndicator = false,
}: ResultsSummaryProps) {
  return (
    <>
      <div className="hidden sm:grid   grid-cols-3 gap-2 md:gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex items-center sm:space-x-4">
          <div className="bg-white/10 p-2 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-white/70">Puntuación</p>
            <p className="text-md font-bold text-white">{score}%</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex items-center sm:space-x-4">
          <div className="bg-white/10 p-2 rounded-full">
            <Check className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="">
            <p className="text-sm text-white/70">Respuestas</p>
            <p className="text-md font-bold text-white">
              {correctAnswers} / {totalQuestions}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex items-center sm:space-x-4">
          <div className="bg-white/10 p-2 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-white/70">Promedio</p>
            <div className="flex items-center">
              <p className="text-md font-bold text-white">{averageScore}%</p>
              <ImprovementIndicator
                currentScore={score}
                previousAverage={averageScore}
                showIndicator={showImprovementIndicator}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden grid  grid-cols-3 gap-2 md:gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex flex-col items-center sm:space-x-4">
          <p className="text-sm text-white/70">Puntuación</p>
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 p-2  rounded-full">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-md font-bold text-white">{score}%</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex flex-col items-center sm:space-x-4">
          <p className="text-sm text-white/70">Respuestas</p>

          <div className="flex items-center space-x-2">
            <div className="bg-white/10 p-2 rounded-full">
              <Check className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-md font-bold text-white">
              {correctAnswers} / {totalQuestions}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-6 flex flex-col items-center sm:space-x-4">
          <p className="text-sm text-white/70">Promedio</p>
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center">
              <p className="text-md font-bold text-white">{averageScore}%</p>
              <ImprovementIndicator
                currentScore={score}
                previousAverage={averageScore}
                showIndicator={showImprovementIndicator}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
