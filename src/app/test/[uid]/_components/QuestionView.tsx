"use client"

import React from "react"
import { Button } from "@/components/ui/Button"
import {
  Check,
  Bookmark,
  BookmarkCheck,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Flag,
} from "@/components/ui/icons"
import { getQuestionText } from "./Helpers"
import type { Question, QuestionOption, TestExecutionAnswer } from "./Types"

interface QuestionViewProps {
  currentQuestion: Question
  currentQuestionIndex: number
  totalQuestions: number
  answers: TestExecutionAnswer[]
  selectedAnswerKey: string | null
  onAnswerSelect: (optionKey: string) => void
  onNext: () => void
  onPrevious: () => void
  onFinishTest: () => void
  toggleMarkQuestion?: (questionId: number) => void
  isSavingAnswer: boolean
}

export default function QuestionView({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  answers,
  selectedAnswerKey,
  onAnswerSelect,
  onNext,
  onPrevious,
  onFinishTest,
  toggleMarkQuestion,
  isSavingAnswer,
}: QuestionViewProps) {
  const currentAnswerRecord = answers.find(
    (a) => a.question_id === currentQuestion.id,
  )
  const isMarked = currentAnswerRecord?.is_marked

  const questionDisplayText = getQuestionText(currentQuestion as any)

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <span className="text-2xl font-bold text-white">
          Pregunta {currentQuestionIndex + 1} de {totalQuestions}
        </span>

        {toggleMarkQuestion && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toggleMarkQuestion(currentQuestion.id)}
            disabled={isSavingAnswer}
            className={`${
              isMarked
                ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20"
                : "text-blue-300 hover:text-blue-200 hover:bg-blue-500/20"
            }`}
          >
            {isMarked ? (
              <BookmarkCheck className="h-4 w-4 mr-1" />
            ) : (
              <Bookmark className="h-4 w-4 mr-1" />
            )}
            {isMarked ? "Marcada" : "Marcar"}
          </Button>
        )}
      </div>

      <div className="text-xl font-medium text-white mb-8 whitespace-pre-line">
        {questionDisplayText}
      </div>

      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option: QuestionOption) => (
          <button
            key={option.key}
            onClick={() => onAnswerSelect(option.key)}
            disabled={isSavingAnswer}
            className={`w-full p-4 rounded-lg flex items-start text-left transition-colors
              ${
                option.key === selectedAnswerKey
                  ? "bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }
              ${isSavingAnswer ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            <div
              className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 
                ${
                  option.key === selectedAnswerKey
                    ? "bg-white text-blue-600"
                    : "border-2 border-white/40 text-white/70"
                }`}
            >
              {option.key === selectedAnswerKey ? (
                <Check className="h-4 w-4" />
              ) : (
                option.key
              )}
            </div>
            <span className="flex-1">{option.value}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
        <Button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0 || isSavingAnswer}
          className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20"
          aria-label="Pregunta Anterior"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Anterior
        </Button>
        {currentQuestionIndex === totalQuestions - 1 ? (
          <Button
            onClick={onFinishTest}
            className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
            disabled={isSavingAnswer}
            aria-label="Finalizar Test"
          >
            {isSavingAnswer ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Flag className="mr-2 h-5 w-5" />
            )}
            Finalizar test
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={isSavingAnswer}
            className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20"
            aria-label="Siguiente Pregunta"
          >
            {isSavingAnswer && (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            )}
            Siguiente
            {!isSavingAnswer && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  )
}
