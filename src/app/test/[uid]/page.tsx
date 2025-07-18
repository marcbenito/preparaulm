"use client"

import React, { useState, useEffect, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { AlertCircle } from "@/components/ui/icons"
import { createClient } from "@/utils/supabase/client"
import { CompleteTestExecutionUseCase } from "@/domain/use-cases/CompleteTestExecutionUseCase"
import {
  GetTestExecutionDetailsUseCase,
  QuestionWithAnswer,
} from "@/domain/use-cases/tests/GetTestExecutionDetailsUseCase"
import { SaveTestAnswerUseCase } from "@/domain/use-cases/tests/SaveTestAnswerUseCase"
import { ToggleMarkQuestionUseCase } from "@/domain/use-cases/tests/ToggleMarkQuestionUseCase"
import { TestExecution } from "@/domain/entities/TestExecution"
import QuestionSidebar from "./_components/QuestionSidebar"
import QuestionView from "./_components/QuestionView"
import TestProgress from "./_components/TestProgress"
import FinalizingTestScreen from "./_components/FinalizingTestScreen"
import {
  Redirecting,
  LoadingSkeleton,
  ErrorMessage,
  EmptyMessage,
} from "./_components/LoadingStates"

export default function TestPage({ params }: { params: any }) {
  const router = useRouter()
  const resolvedParams = use(params) as { uid: string | string[] }
  const uid = Array.isArray(resolvedParams.uid)
    ? resolvedParams.uid[0]
    : resolvedParams.uid

  const [testExecution, setTestExecution] = useState<TestExecution | null>(null)
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<
    QuestionWithAnswer[]
  >([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [isFinalizingTest, setIsFinalizingTest] = useState(false)
  const [finalizationError, setFinalizationError] = useState<string | null>(
    null,
  )

  const supabase = createClient()

  const fetchTestData = useCallback(
    async (testExecutionId: number) => {
      try {
        setLoading(true)
        setError(null)

        const getTestExecutionDetailsUseCase =
          GetTestExecutionDetailsUseCase.create(supabase)
        const result = await getTestExecutionDetailsUseCase.execute({
          testExecutionId,
        })

        if (result.error) {
          throw new Error(result.error)
        }

        if (!result.testExecution) {
          throw new Error("Ejecución del test no encontrada.")
        }

        setTestExecution(result.testExecution)

        if (result.testExecution.completedAt) {
          setIsRedirecting(true)
          router.push(`/test/${testExecutionId}/review`)
          return
        }

        if (result.questionsWithAnswers.length === 0) {
          throw new Error("No se encontraron preguntas para este test.")
        }

        setQuestionsWithAnswers(result.questionsWithAnswers)

        if (result.questionsWithAnswers.length > 0) {
          setSelectedAnswer(
            result.questionsWithAnswers[0].selectedAnswer || null,
          )
        }
      } catch (err: any) {
        console.error("Error al cargar los datos del test:", err)
        setError(
          err.message || "Ocurrió un error inesperado al cargar el test.",
        )
      } finally {
        setLoading(false)
      }
    },
    [router, supabase],
  )

  useEffect(() => {
    if (uid) {
      const testIdNum = parseInt(uid)
      if (isNaN(testIdNum)) {
        setError("ID de test inválido.")
        setLoading(false)
        return
      }
      fetchTestData(testIdNum)
    } else {
      setError("ID de test no disponible.")
      setLoading(false)
    }
  }, [uid, fetchTestData])

  useEffect(() => {
    if (
      questionsWithAnswers.length > 0 &&
      currentQuestionIndex < questionsWithAnswers.length
    ) {
      const currentQuestionWithAnswer =
        questionsWithAnswers[currentQuestionIndex]
      setSelectedAnswer(currentQuestionWithAnswer.selectedAnswer || null)
    } else if (questionsWithAnswers.length === 0) {
      setSelectedAnswer(null)
    }
  }, [currentQuestionIndex, questionsWithAnswers])

  const handleAnswerSelect = (optionKey: string) => {
    if (
      loading ||
      !questionsWithAnswers.length ||
      currentQuestionIndex >= questionsWithAnswers.length
    )
      return

    const currentQuestionWithAnswer = questionsWithAnswers[currentQuestionIndex]

    setSelectedAnswer(optionKey)
    setUnsavedChanges(true)

    const updatedQuestionsWithAnswers = [...questionsWithAnswers]
    updatedQuestionsWithAnswers[currentQuestionIndex] = {
      ...currentQuestionWithAnswer,
      selectedAnswer: optionKey,
      isCorrect: optionKey === currentQuestionWithAnswer.correctAnswer,
    }
    setQuestionsWithAnswers(updatedQuestionsWithAnswers)
  }

  const saveCurrentAnswer = useCallback(async () => {
    if (
      !unsavedChanges ||
      !questionsWithAnswers.length ||
      currentQuestionIndex >= questionsWithAnswers.length
    )
      return true

    const currentQuestionWithAnswer = questionsWithAnswers[currentQuestionIndex]

    if (!currentQuestionWithAnswer.selectedAnswer) {
      return true
    }

    setSaving(true)
    setSaveError(null)
    try {
      const saveTestAnswerUseCase = SaveTestAnswerUseCase.create(supabase)
      const result = await saveTestAnswerUseCase.execute({
        answerId: currentQuestionWithAnswer.answerId,
        selectedAnswer: currentQuestionWithAnswer.selectedAnswer,
        isCorrect: currentQuestionWithAnswer.isCorrect || false,
      })

      if (!result.success) {
        throw new Error(result.error || "No se pudo guardar la respuesta.")
      }

      setUnsavedChanges(false)
      return true
    } catch (err: any) {
      console.error("Error al guardar la respuesta:", err)
      setSaveError(err.message || "No se pudo guardar la respuesta.")
      return false
    } finally {
      setSaving(false)
    }
  }, [supabase, questionsWithAnswers, currentQuestionIndex, unsavedChanges])

  const handleNext = async () => {
    if (currentQuestionIndex < questionsWithAnswers.length - 1) {
      const saved = await saveCurrentAnswer()
      if (saved) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }
  }

  const handlePrevious = async () => {
    if (currentQuestionIndex > 0) {
      const saved = await saveCurrentAnswer()
      if (saved) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }
    }
  }

  const toggleMarkQuestion = useCallback(
    async (questionId: number) => {
      const questionIndex = questionsWithAnswers.findIndex(
        (q) => q.id === questionId,
      )
      if (questionIndex === -1) return

      const questionWithAnswer = questionsWithAnswers[questionIndex]
      const newMarkedState = !questionWithAnswer.isMarked

      const updatedQuestionsWithAnswers = [...questionsWithAnswers]
      updatedQuestionsWithAnswers[questionIndex] = {
        ...questionWithAnswer,
        isMarked: newMarkedState,
      }
      setQuestionsWithAnswers(updatedQuestionsWithAnswers)

      try {
        const toggleMarkQuestionUseCase =
          ToggleMarkQuestionUseCase.create(supabase)
        const result = await toggleMarkQuestionUseCase.execute({
          answerId: questionWithAnswer.answerId,
          isMarked: newMarkedState,
        })

        if (!result.success) {
          updatedQuestionsWithAnswers[questionIndex] = {
            ...questionWithAnswer,
            isMarked: !newMarkedState,
          }
          setQuestionsWithAnswers(updatedQuestionsWithAnswers)
        }
      } catch (err) {
        console.error("Error al marcar/desmarcar la pregunta:", err)
        updatedQuestionsWithAnswers[questionIndex] = {
          ...questionWithAnswer,
          isMarked: !newMarkedState,
        }
        setQuestionsWithAnswers(updatedQuestionsWithAnswers)
      }
    },
    [supabase, questionsWithAnswers],
  )

  const handleFinishTest = async () => {
    if (!testExecution) return

    const saved = await saveCurrentAnswer()
    if (!saved && unsavedChanges) {
      setSaveError(
        "No se pudo guardar la última respuesta. Por favor, inténtalo de nuevo antes de finalizar.",
      )
      return
    }

    setIsFinalizingTest(true)
    setFinalizationError(null)
    setSaveError(null)

    const timer = new Promise((resolve) => setTimeout(resolve, 2000))

    const completeTest = async () => {
      const completeTestUseCase = new CompleteTestExecutionUseCase(supabase)
      await completeTestUseCase.execute(testExecution.id, testExecution.userId)
    }

    try {
      await Promise.all([timer, completeTest()])
      setIsRedirecting(true)
      router.push(`/test/${uid}/review`)
    } catch (err: any) {
      console.error("Error al finalizar el test:", err)
      setFinalizationError(
        err.message || "Ocurrió un error al finalizar el test.",
      )
    }
  }

  const handleRetryFinalization = () => {
    setFinalizationError(null)
    handleFinishTest()
  }

  if (isFinalizingTest) {
    return (
      <FinalizingTestScreen
        isError={!!finalizationError}
        errorMessage={finalizationError || undefined}
        onRetry={finalizationError ? handleRetryFinalization : undefined}
      />
    )
  }

  if (isRedirecting)
    return <Redirecting message="Redirigiendo a la revisión del test..." />
  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />
  if (questionsWithAnswers.length === 0 && !loading)
    return (
      <EmptyMessage message="No hay preguntas disponibles para este test." />
    )

  const currentQuestionWithAnswer = questionsWithAnswers[currentQuestionIndex]
  if (!currentQuestionWithAnswer) {
    return (
      <EmptyMessage message="Pregunta no encontrada o el test está vacío." />
    )
  }

  const currentQuestion = {
    id: currentQuestionWithAnswer.id,
    text: currentQuestionWithAnswer.text,
    options: currentQuestionWithAnswer.options,
    correct_answer: currentQuestionWithAnswer.correctAnswer,
    category_id: currentQuestionWithAnswer.categoryId,
    explanation: currentQuestionWithAnswer.explanation,
  }

  const answers = questionsWithAnswers.map((qwa) => ({
    id: qwa.answerId,
    test_execution_id: testExecution?.id || 0,
    question_id: qwa.id,
    selected_answer: qwa.selectedAnswer,
    is_correct: qwa.isCorrect,
    observations: qwa.observations,
    is_marked: qwa.isMarked,
  }))

  const questions = questionsWithAnswers.map((qwa) => ({
    id: qwa.id,
    text: qwa.text,
    options: qwa.options,
    correct_answer: qwa.correctAnswer,
    category_id: qwa.categoryId,
    explanation: qwa.explanation,
  }))

  const testExecutionForComponents = testExecution
    ? {
        id: testExecution.id,
        test_id: testExecution.testId,
        user_id: testExecution.userId,
        created_at: testExecution.createdAt.toISOString(),
        completed_at: testExecution.completedAt?.toISOString() || null,
        score: testExecution.score,
        status: testExecution.completedAt ? "completed" : "in-progress",
      }
    : null

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-12">
      <div className="md:hidden flex flex-col gap-4">
        <TestProgress
          testExecution={testExecutionForComponents}
          answers={answers}
          totalQuestions={questionsWithAnswers.length}
        />
      </div>

      {saveError && (
        <Alert variant="destructive" className="mb-6 p-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="hidden md:block md:col-span-3">
          <QuestionSidebar
            questions={questions}
            answers={answers}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={(index: number) => {
              saveCurrentAnswer().then(() => setCurrentQuestionIndex(index))
            }}
            toggleMarkQuestion={toggleMarkQuestion}
          />
        </div>

        <div className="col-span-1 md:col-span-9">
          <div className="hidden md:block">
            <TestProgress
              testExecution={testExecutionForComponents}
              answers={answers}
              totalQuestions={questionsWithAnswers.length}
            />
          </div>
          {currentQuestion && (
            <QuestionView
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questionsWithAnswers.length}
              answers={answers}
              selectedAnswerKey={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onFinishTest={handleFinishTest}
              isSavingAnswer={saving}
            />
          )}
        </div>
      </div>
    </div>
  )
}
