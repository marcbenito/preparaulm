import { SupabaseClient } from "@supabase/supabase-js"
import { TestRepository, TestRepositoryImpl } from "@/domain/repositories/TestRepository"
import { TestExecution, TestExecutionAnswer } from "@/domain/entities/TestExecution"
import { Question, QuestionOption } from "@/domain/entities/Question"

export interface GetTestExecutionDetailsUseCaseParams {
  testExecutionId: number
}

export interface QuestionWithAnswer {
  id: number
  text: string
  options: QuestionOption[]
  correctAnswer: string
  categoryId: string
  explanation?: string | null
  
  answerId: number
  selectedAnswer: string | null
  isCorrect: boolean | null
  observations: string | null
  isMarked: boolean
}

export interface GetTestExecutionDetailsUseCaseResult {
  testExecution: TestExecution | null
  questionsWithAnswers: QuestionWithAnswer[]
  error?: string
}

export class GetTestExecutionDetailsUseCase {
  constructor(private testRepository: TestRepository) {}

  async execute(params: GetTestExecutionDetailsUseCaseParams): Promise<GetTestExecutionDetailsUseCaseResult> {
    try {
      const { testExecutionId } = params

      const testExecution = await this.testRepository.getTestExecution(testExecutionId)
      
      if (!testExecution) {
        return {
          testExecution: null,
          questionsWithAnswers: [],
          error: "Ejecución del test no encontrada."
        }
      }

      if (testExecution.completedAt) {
        return {
          testExecution,
          questionsWithAnswers: [],
          error: "El test ya ha sido completado."
        }
      }

      const answers = testExecution.answers || []
      
      if (answers.length === 0) {
        return {
          testExecution,
          questionsWithAnswers: [],
          error: "No se encontraron preguntas para este test."
        }
      }

      const questionIds = answers.map(answer => answer.questionId)
      const questions = await this.testRepository.getQuestionsByIds(questionIds)

      const questionsMap = new Map<number, Question>()
      questions.forEach(question => {
        questionsMap.set(question.id, question)
      })

      const questionsWithAnswers: QuestionWithAnswer[] = answers
        .map(answer => {
          const question = questionsMap.get(answer.questionId)
          if (!question) return null

          return {
            id: question.id,
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            categoryId: question.categoryId,
            explanation: question.explanation,
            
            answerId: answer.id,
            selectedAnswer: answer.selectedAnswer,
            isCorrect: answer.isCorrect,
            observations: answer.observations,
            isMarked: answer.isMarked
          }
        })
        .filter(item => item !== null) as QuestionWithAnswer[]

      return {
        testExecution,
        questionsWithAnswers,
        error: undefined
      }

    } catch (error: any) {
      console.error("Error en GetTestExecutionDetailsUseCase:", error)
      return {
        testExecution: null,
        questionsWithAnswers: [],
        error: error.message || "Ocurrió un error inesperado al cargar el test."
      }
    }
  }

  static create(supabaseClient: SupabaseClient): GetTestExecutionDetailsUseCase {
    const testRepository = new TestRepositoryImpl(supabaseClient)
    return new GetTestExecutionDetailsUseCase(testRepository)
  }
} 