import { SupabaseClient } from "@supabase/supabase-js"
import { TestRepository, TestRepositoryImpl } from "@/domain/repositories/TestRepository"
import { TestExecutionAnswer } from "@/domain/entities/TestExecution"

export interface SaveTestAnswerUseCaseParams {
  answerId: number
  selectedAnswer: string
  isCorrect: boolean
}

export interface SaveTestAnswerUseCaseResult {
  success: boolean
  answer?: TestExecutionAnswer
  error?: string
}

export class SaveTestAnswerUseCase {
  constructor(private testRepository: TestRepository) {}

  async execute(params: SaveTestAnswerUseCaseParams): Promise<SaveTestAnswerUseCaseResult> {
    try {
      const { answerId, selectedAnswer, isCorrect } = params

      const updatedAnswer = await this.testRepository.updateTestExecutionAnswer(answerId, {
        selectedAnswer,
        isCorrect
      })

      return {
        success: true,
        answer: updatedAnswer,
        error: undefined
      }

    } catch (error: any) {
      console.error("Error en SaveTestAnswerUseCase:", error)
      return {
        success: false,
        answer: undefined,
        error: error.message || "No se pudo guardar la respuesta."
      }
    }
  }

  static create(supabaseClient: SupabaseClient): SaveTestAnswerUseCase {
    const testRepository = new TestRepositoryImpl(supabaseClient)
    return new SaveTestAnswerUseCase(testRepository)
  }
} 