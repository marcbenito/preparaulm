import React from "react"
import { Check, X, Circle } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

type QuestionNavigatorProps = {
  questions: number
  currentQuestion: number
  visibleQuestion?: number
  answers: Array<{
    is_correct: boolean | null
    is_marked: boolean
  }>
  onQuestionSelect: (index: number) => void
}

export function QuestionNavigator({
  questions,
  currentQuestion,
  visibleQuestion = -1,
  answers,
  onQuestionSelect,
}: QuestionNavigatorProps) {
  return (
    <div className="sticky top-16 z-10 bg-cosmic-night  bg-white/10 rounded-lg py-4 border-b p-4 ">
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {Array.from({ length: questions }).map((_, index) => {
            const answer = answers[index]
            const isSelected = currentQuestion === index
            const isVisible = visibleQuestion === index

            let bgColor = "bg-slate-700"
            let Icon = Circle
            let status = "Pendiente"

            if (answer) {
              if (answer.is_correct === true) {
                bgColor = "bg-emerald-400"
                Icon = Check
                status = "Correcta"
              } else if (answer.is_correct === false) {
                bgColor = "bg-rose-400"
                Icon = X
                status = "Incorrecta"
              }
            }

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <a
                    href={`#question-${index + 1}`}
                    onClick={() => onQuestionSelect(index)}
                    className={`relative min-w-[48px] p-2 rounded-lg bg-white/10 hover:opacity-90 transition-opacity  
                     ${isVisible ? "ring-2 ring-white" : ""} block`}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-medium text-white/90">
                        {index + 1}
                      </span>
                      <div className={`w-4 h-4 rounded-full ${bgColor}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    {answer?.is_marked && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />
                    )}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm text-muted-foreground">{status}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </div>
  )
}
