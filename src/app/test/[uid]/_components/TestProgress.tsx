"use client"

import React from "react"
import { Progress } from "@/components/ui/Progress"
import { Timer } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"
import { Flag } from "@/components/ui/icons"

// Tipos
type TestExecution = {
  id: number
  test_id: number | null
  user_id: string
  created_at: string
  completed_at: string | null
  score: number | null
  status: string | null
}

type TestExecutionAnswer = {
  id: number
  test_execution_id: number
  question_id: number
  selected_answer: string | null
  is_correct: boolean | null
  observations: string | null
  is_marked: boolean
}

interface TestProgressProps {
  testExecution: TestExecution | null
  answers: TestExecutionAnswer[]
  totalQuestions: number
}

export default function TestProgress({
  testExecution,
  answers,
  totalQuestions,
}: TestProgressProps) {
  // Calcular progreso
  const answeredCount = answers.filter((a) => a.selected_answer !== null).length
  const progress =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0

  return (
    <div className="flex flex-col  justify-between mb-8">
      <h1 className="text-2xl font-bold text-white pb-4">
        Test #{testExecution?.id}
      </h1>
      <div className="flex items-center gap-4">
        <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
          <Timer className="h-5 w-5 text-blue-300" />
          <span className="text-white font-medium text-sm">En progreso</span>
        </div>
        <Progress value={progress} className="w-48" />
      </div>
    </div>
  )
}
