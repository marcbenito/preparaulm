"use client"

import React, { useState, useEffect, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "@/components/ui/icons"
import { createClient } from "@/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"
import { useToastContext } from "@/context/ToastContext"
import { UserTestScoreService } from "@/domain/services/UserTestScoreService"

// Importar componentes
import { ResultsSummary } from "./_components/ResultsSummary"
import { QuestionNavigator } from "./_components/QuestionNavigator"
import { QuestionReview } from "./_components/QuestionReview"
import { ObservationsField } from "./_components/ObservationsField"
import { LoadingStates } from "./_components/LoadingStates"

// --- Core Types --- (Consistent with test taking page)
export interface QuestionOption {
  // Exporting for child components
  key: string
  value: string
}

export interface Question {
  // Exporting for child components
  id: number
  text: string
  options: QuestionOption[]
  correct_answer: string // Stores the key of the correct option
  category_id: string
  explanation?: string | null
}

interface QuestionFromDB {
  // For data directly from DB before options parsing
  id: number
  text: string
  options: any // JSONB from DB
  correct_answer: string
  category_id: string
  explanation?: string | null
}

interface TestExecution {
  id: number
  test_id: number | null
  user_id: string
  created_at: string
  completed_at: string | null
  score: number | null
  status: string | null
}

export interface TestExecutionAnswer {
  // Exporting for child components
  id: number
  test_execution_id: number
  question_id: number
  selected_answer: string | null // Stores the key of selected option
  is_correct: boolean | null
  observations: string | null
  is_marked: boolean
}
// --- End Core Types ---

// Helper function to parse options (mirroring from test/[uid]/page.tsx)
const parseDBQuestionOptions = (optionsFromDB: any): QuestionOption[] => {
  if (typeof optionsFromDB === "string") {
    try {
      const parsed = JSON.parse(optionsFromDB)
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (opt) =>
            opt && typeof opt.key === "string" && typeof opt.value === "string",
        )
      ) {
        return parsed as QuestionOption[]
      }
    } catch (e) {
      console.error(
        "TestReviewPage: Failed to parse question options string:",
        e,
      )
    }
  } else if (
    Array.isArray(optionsFromDB) &&
    optionsFromDB.every(
      (opt) =>
        opt && typeof opt.key === "string" && typeof opt.value === "string",
    )
  ) {
    return optionsFromDB as QuestionOption[]
  }
  console.warn(
    "TestReviewPage: Question options are not in expected format, returning empty array.",
  )
  return []
}

export default function TestReviewPage({ params }: { params: any }) {
  const router = useRouter()
  const resolvedParams = use(params) as { uid: string | string[] }
  const uid = Array.isArray(resolvedParams.uid)
    ? resolvedParams.uid[0]
    : resolvedParams.uid

  const [testExecution, setTestExecution] = useState<TestExecution | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<TestExecutionAnswer[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState<string>("")
  const [visibleQuestionIndex, setVisibleQuestionIndex] = useState(0)
  const { showToast } = useToastContext()

  // Estados para el promedio y mejora
  const [averageScore, setAverageScore] = useState(0)
  const [showImprovementIndicator, setShowImprovementIndicator] = useState(false)

  const supabase = createClient()

  // Estado para manejar las observaciones temporales mientras se editan
  const [tempObservations, setTempObservations] = useState<{
    [key: number]: string
  }>({})

  // Estado para los botones de guardado
  const [savingObservations, setSavingObservations] = useState<{
    [key: number]: boolean
  }>({})

  // Estado para los botones que muestran el check de guardado exitoso
  const [savedSuccessfully, setSavedSuccessfully] = useState<{
    [key: number]: boolean
  }>({})

  // Estado para el proceso de marcado
  const [markLoading, setMarkLoading] = useState<{
    [key: number]: boolean
  }>({})

  useEffect(() => {
    if (uid) {
      const testIdNum = parseInt(uid)
      if (isNaN(testIdNum)) {
        setError("ID de test inválido.")
        setLoading(false)
        return
      }

      const fetchTestData = async () => {
        try {
          setLoading(true)
          setError(null)

          const { data: execData, error: execError } = await supabase
            .from("test_executions")
            .select("*")
            .eq("id", testIdNum)
            .single()
          if (execError)
            throw new Error(
              execError.message || "No se pudo cargar la ejecución del test.",
            )
          if (!execData) throw new Error("Ejecución del test no encontrada.")
          const testExecutionData = execData as TestExecution
          setTestExecution(testExecutionData)

          // Calcular el promedio usando el servicio
          const userTestScoreService = new UserTestScoreService(supabase)
          const { averageScore: calculatedAverage, totalCompletedTests } = 
            await userTestScoreService.getUserAverageScore(
              testExecutionData.user_id, 
              testExecutionData.id
            )
          
          setAverageScore(calculatedAverage)
          
          // Determinar si mostrar el indicador de mejora
          const shouldShowIndicator = totalCompletedTests > 0 && calculatedAverage > 0
          setShowImprovementIndicator(shouldShowIndicator)

          const { data: answersData, error: answersError } = await supabase
            .from("test_execution_answers")
            .select("*")
            .eq("test_execution_id", testIdNum)
            .order("id", { ascending: true })
          if (answersError)
            throw new Error(
              answersError.message ||
                "No se pudieron cargar las respuestas del test.",
            )
          if (!answersData || answersData.length === 0)
            throw new Error(
              "No se encontraron respuestas/preguntas para este test.",
            )
          setAnswers(answersData as TestExecutionAnswer[])

          const questionIds = answersData.map(
            (answer: TestExecutionAnswer) => answer.question_id,
          )
          if (questionIds.length === 0)
            throw new Error("No hay IDs de preguntas en las respuestas.")

          const { data: questionsDataFromDB, error: questionsError } =
            await supabase.from("questions").select("*").in("id", questionIds)
          if (questionsError)
            throw new Error(
              questionsError.message || "No se pudieron cargar las preguntas.",
            )
          if (!questionsDataFromDB)
            throw new Error("No se recibieron datos de preguntas.")

          const questionsMap = new Map<number, Question>()
          questionsDataFromDB.forEach((qDb: QuestionFromDB) => {
            questionsMap.set(qDb.id, {
              id: qDb.id,
              text: qDb.text,
              options: parseDBQuestionOptions(qDb.options), // Parse options here
              correct_answer: qDb.correct_answer,
              category_id: qDb.category_id,
              explanation: qDb.explanation,
            } as Question)
          })

          const orderedQuestions = answersData
            .map((answer: TestExecutionAnswer) =>
              questionsMap.get(answer.question_id),
            )
            .filter((q) => q !== undefined) as Question[]
          setQuestions(orderedQuestions)

          if (orderedQuestions.length > 0 && orderedQuestions[0].category_id) {
            const { data: categoryData } = await supabase
              .from("categories")
              .select("name")
              .eq("id", orderedQuestions[0].category_id)
              .single()
            if (categoryData) setCategoryName(categoryData.name)
          }
        } catch (err: any) {
          console.error(
            "Error al cargar los datos del test para revisión:",
            err,
          )
          setError(
            err.message || "Ocurrió un error inesperado al cargar la revisión.",
          )
        } finally {
          setLoading(false)
        }
      }

      fetchTestData()
    } else {
      setError("ID de test no disponible para revisión.")
      setLoading(false)
    }
  }, [uid, supabase])

  const handleSaveObservations = async (questionId: number) => {
    const answerRecord = answers.find((a) => a.question_id === questionId)
    if (!answerRecord) return
    const answerId = answerRecord.id

    try {
      setSavingObservations((prev) => ({ ...prev, [questionId]: true }))
      const { error } = await supabase
        .from("test_execution_answers")
        .update({ observations: tempObservations[questionId] })
        .eq("id", answerId)
      if (error) throw error

      setSavedSuccessfully((prev) => ({ ...prev, [questionId]: true }))
      showToast(
        "success",
        "Observaciones guardadas",
        "Las observaciones se han guardado correctamente.",
      )
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answerId
            ? { ...a, observations: tempObservations[questionId] }
            : a,
        ),
      )
    } catch (error) {
      console.error("Error al guardar las observaciones:", error)
      showToast("error", "Error", "No se pudieron guardar las observaciones.")
    } finally {
      setSavingObservations((prev) => ({ ...prev, [questionId]: false }))
      setTimeout(
        () =>
          setSavedSuccessfully((prev) => ({ ...prev, [questionId]: false })),
        2000,
      )
    }
  }

  const handleToggleMark = async (questionId: number) => {
    const answer = answers.find((a) => a.question_id === questionId)
    if (!answer) return
    const newIsMarked = !answer.is_marked

    try {
      setMarkLoading((prev) => ({ ...prev, [questionId]: true }))
      const { error } = await supabase
        .from("test_execution_answers")
        .update({ is_marked: newIsMarked })
        .eq("id", answer.id)
      if (error) throw error
      setAnswers((prev) =>
        prev.map((a) =>
          a.question_id === questionId ? { ...a, is_marked: newIsMarked } : a,
        ),
      )
    } catch (error) {
      console.error("Error al marcar/desmarcar la pregunta:", error)
      showToast(
        "error",
        "Error",
        "No se pudo actualizar el estado de la marca.",
      )
    } finally {
      setMarkLoading((prev) => ({ ...prev, [questionId]: false }))
    }
  }

  // Configurar el IntersectionObserver para detectar la pregunta visible actualmente
  useEffect(() => {
    if (loading || error || questions.length === 0) return

    const options = {
      root: null, // viewport
      rootMargin: "-20% 0px -70% 0px", // considera que un elemento es visible cuando está al menos 30% en el viewport
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const questionNumber = parseInt(id.replace("question-", ""))
          if (!isNaN(questionNumber)) {
            setVisibleQuestionIndex(questionNumber - 1)
          }
        }
      })
    }, options)

    // Observar todos los elementos de preguntas
    const questionElements = document.querySelectorAll('[id^="question-"]')
    questionElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [loading, error, questions.length])

  // Función para hacer scroll suave a una pregunta
  const scrollToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index)
    const element = document.getElementById(`question-${index + 1}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto p-4 md:p-6 md:py-12 max-w-screen-lg">
        <LoadingStates isLoading={loading} error={error} />

        {!loading && !error && testExecution && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Button
                  variant="ghost"
                  className="text-white mb-2 hover:bg-white/10"
                  onClick={() => router.push("/test-selection")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Selección de Test
                </Button>
                <h1 className="text-2xl font-bold text-white">
                  Revisión del Test {categoryName ? `: ${categoryName}` : ""}
                </h1>
              </div>
            </div>

            <ResultsSummary
              score={testExecution.score || 0}
              correctAnswers={
                answers.filter(
                  (a: TestExecutionAnswer) => a.is_correct === true,
                ).length
              }
              totalQuestions={questions.length}
              averageScore={averageScore}
              showImprovementIndicator={showImprovementIndicator}
            />

            <QuestionNavigator
              questions={questions.length}
              currentQuestion={currentQuestionIndex}
              visibleQuestion={visibleQuestionIndex}
              answers={answers}
              onQuestionSelect={scrollToQuestion}
            />

            <div className="space-y-8 mt-10">
              <h2 className="text-2xl font-bold text-white">
                Revisión de Preguntas
              </h2>

              {questions.map((question, index) => {
                const answer = answers.find(
                  (a: TestExecutionAnswer) => a.question_id === question.id,
                )
                return (
                  <div
                    key={question.id}
                    className="bg-white/10 rounded-xl p-4 md:p-6"
                    id={`question-${index + 1}`}
                  >
                    <QuestionReview
                      question={question}
                      selectedAnswerKey={answer?.selected_answer || null}
                      isCorrect={answer?.is_correct || null}
                      questionNumber={index + 1}
                      isMarked={answer?.is_marked || false}
                      onToggleMark={() => handleToggleMark(question.id)}
                      isMarkLoading={!!markLoading[question.id]}
                    />

                    <ObservationsField
                      observations={
                        tempObservations[question.id] ??
                        answer?.observations ??
                        ""
                      }
                      onUpdateObservations={(value: string) =>
                        setTempObservations((prev) => ({
                          ...prev,
                          [question.id]: value,
                        }))
                      }
                      onSave={() => handleSaveObservations(question.id)}
                      isSaving={!!savingObservations[question.id]}
                      isSaved={!!savedSuccessfully[question.id]}
                    />
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
