import React from "react"
import {
  Check,
  X,
  Bookmark,
  BookmarkCheck,
  Loader2,
} from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import type { Question, QuestionOption } from "../page" // Import shared types

interface QuestionReviewProps {
  question: Question // Uses imported Question type with QuestionOption[]
  selectedAnswerKey: string | null // Renamed from selectedAnswer, stores the option KEY
  isCorrect: boolean | null
  questionNumber: number
  isMarked?: boolean
  onToggleMark?: () => void
  isMarkLoading?: boolean
}

export function QuestionReview({
  question,
  selectedAnswerKey, // Updated prop name
  isCorrect,
  questionNumber,
  isMarked = false,
  onToggleMark = () => {},
  isMarkLoading = false,
}: QuestionReviewProps) {
  return (
    <div className="space-y-8 scroll-mt-28">
      <div className="flex flex-col-reverse md:flex-row items-start gap-4 justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Assuming question.text is a simple string. If it can be complex, use getQuestionText from helpers */}
          <h3 className="text-lg md:text-xl font-bold text-white whitespace-pre-line">
            {question.text}
          </h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleMark}
          disabled={isMarkLoading}
          className={cn(
            "self-end md:self-start",
            isMarked
              ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20"
              : "text-blue-300 hover:text-blue-200 hover:bg-blue-500/20",
          )}
          aria-label={isMarked ? "Desmarcar pregunta" : "Marcar pregunta"}
        >
          {isMarkLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Guardando...
            </>
          ) : isMarked ? (
            <>
              <BookmarkCheck className="h-4 w-4 mr-1" />
              Marcada
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4 mr-1" />
              Marcar
            </>
          )}
        </Button>
      </div>

      <div className="space-y-3">
        {question.options.map((option: QuestionOption) => {
          const isSelectedByUser = selectedAnswerKey === option.key
          const isCorrectOption = question.correct_answer === option.key

          let ringColor = ""
          if (isCorrectOption) {
            ringColor = "ring-emerald-500/70"
          } else if (isSelectedByUser && !isCorrectOption) {
            ringColor = "ring-rose-500/70"
          }

          return (
            <div
              key={option.key} // Use option.key for the key
              className={cn(
                "p-3 rounded-lg flex items-center text-white transition-all",
                "border border-transparent", // Base border
                isCorrectOption
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "",
                isSelectedByUser && !isCorrectOption
                  ? "bg-rose-500/10 border-rose-500/30"
                  : "",
                !isSelectedByUser && !isCorrectOption
                  ? "bg-white/5 hover:bg-white/10"
                  : "",
                isSelectedByUser ? "ring-2 shadow-md" : "",
                ringColor,
              )}
            >
              <div
                className={cn(
                  "h-6 w-6 mr-3 rounded-md flex items-center justify-center text-sm font-semibold flex-shrink-0",
                  isCorrectOption
                    ? "bg-emerald-500/80 text-white"
                    : isSelectedByUser && !isCorrectOption
                      ? "bg-rose-500/80 text-white"
                      : "bg-white/20 text-white/70",
                )}
              >
                {option.key}
              </div>
              <span className="flex-1 text-sm md:text-base">
                {option.value}
              </span>
              <div className="ml-3 w-5 h-5 flex-shrink-0">
                {isSelectedByUser && isCorrectOption && (
                  <Check className="h-5 w-5 text-emerald-400" />
                )}
                {isSelectedByUser && !isCorrectOption && (
                  <X className="h-5 w-5 text-rose-400" />
                )}
                {!isSelectedByUser && isCorrectOption && (
                  // Optionally show a subtle check for correct answer if not selected by user
                  <Check className="h-5 w-5 text-emerald-500/50" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {question.explanation && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none mt-6">
            <AccordionTrigger className="hover:no-underline text-indigo-400 hover:text-indigo-300">
              <h4 className="text-md font-semibold">Explicación</h4>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <p className="text-blue-200 leading-relaxed whitespace-pre-line">
                {question.explanation}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
