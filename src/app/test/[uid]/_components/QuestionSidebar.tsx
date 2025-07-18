"use client"

import React from "react"
import { Check, Circle, Bookmark, BookmarkCheck } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"
import { Separator } from "@/components/ui/Separator"
import type { Question, TestExecutionAnswer } from "./Types"

interface QuestionSidebarProps {
  questions: Question[]
  answers: TestExecutionAnswer[]
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  toggleMarkQuestion: (questionId: number) => void
}

export default function QuestionSidebar({
  questions,
  answers,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  toggleMarkQuestion,
}: QuestionSidebarProps) {
  // Calcular el número de preguntas respondidas
  const answeredCount = answers.filter((a) => a.selected_answer !== null).length
  const markedCount = answers.filter((a) => a.is_marked).length

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, index) => {
          const answer = answers.find((a) => a.question_id === q.id)
          const hasAnswer = !!answer?.selected_answer
          const isMarked = answer?.is_marked || false

          return (
            <Button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-10 w-10 p-0 relative bg-white/5 
                ${
                  index === currentQuestionIndex
                    ? "ring-2 ring-blue-500 text-white"
                    : ""
                }
                ${
                  hasAnswer ? "bg-green-500/20 text-green-200" : "text-white/60"
                }
              `}
            >
              {index + 1}
              {isMarked && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full"></div>
              )}
            </Button>
          )
        })}
      </div>

      <Separator className="my-6 bg-white/10" />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-green-500/20"></div>
          <span className="text-sm text-white/80">
            Respondidas: {answeredCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-white/20"></div>
          <span className="text-sm text-white/80">
            Sin responder: {questions.length - answeredCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-white/80">Marcadas: {markedCount}</span>
        </div>
      </div>
    </div>
  )
}
