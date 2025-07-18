import { SupabaseClient } from "@supabase/supabase-js"
import { TestRepository, TestRepositoryImpl } from "@/domain/repositories/TestRepository"
import { TestExecutionAnswer } from "@/domain/entities/TestExecution"

export interface ToggleMarkQuestionUseCaseParams {
  answerId: number
  isMarked: boolean
}

export interface ToggleMarkQuestionUseCaseResult {
  success: boolean
  answer?: TestExecutionAnswer
  error?: string
}

export class ToggleMarkQuestionUseCase {
  constructor(private testRepository: TestRepository) {}

  async execute(params: ToggleMarkQuestionUseCaseParams): Promise<ToggleMarkQuestionUseCaseResult> {
    try {
      const { answerId, isMarked } = params

      const updatedAnswer = await this.testRepository.updateTestExecutionAnswer(answerId, {
        isMarked
      })

      return {
        success: true,
        answer: updatedAnswer,
        error: undefined
      }

    } catch (error: any) {
      console.error("Error en ToggleMarkQuestionUseCase:", error)
      return {
        success: false,
        answer: undefined,
        error: error.message || "No se pudo marcar/desmarcar la pregunta."
      }
    }
  }

  static create(supabaseClient: SupabaseClient): ToggleMarkQuestionUseCase {
    const testRepository = new TestRepositoryImpl(supabaseClient)
    return new ToggleMarkQuestionUseCase(testRepository)
  }
} 