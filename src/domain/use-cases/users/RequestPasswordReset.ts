import { IAuthRepository, SupabaseAuthRepository } from "@/domain/repositories/AuthRepository"
import { SupabaseClient } from "@supabase/supabase-js"

export interface RequestPasswordResetParams {
  email: string
}

export interface RequestPasswordResetResult {
  success: boolean
  error?: string
}

export class RequestPasswordResetUseCase {
  private constructor(private readonly authRepository: IAuthRepository) {}

  static create(supabase: SupabaseClient): RequestPasswordResetUseCase {
    const authRepository = SupabaseAuthRepository.create(supabase)
    return new RequestPasswordResetUseCase(authRepository)
  }

  async execute(params: RequestPasswordResetParams): Promise<RequestPasswordResetResult> {
    const { email } = params

    try {
      // Usar el repositorio en lugar de Supabase directamente
      await this.authRepository.resetPassword(email)
      return {
        success: true
      }
    } catch (error: any) {
      console.error("Error inesperado en RequestPasswordResetUseCase:", error)
      return {
        success: false,
        error: error.message || "Error inesperado al solicitar reseteo de contraseña"
      }
    }
  }
} 