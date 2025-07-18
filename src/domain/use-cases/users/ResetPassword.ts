import { IAuthRepository, SupabaseAuthRepository } from "@/domain/repositories/AuthRepository"
import { SupabaseClient } from "@supabase/supabase-js"

export interface ResetPasswordParams {
  newPassword: string
  token?: string
}

export interface ResetPasswordResult {
  success: boolean
  error?: string
}

export class ResetPasswordUseCase {
  private constructor(private readonly authRepository: IAuthRepository) {}

  static create(supabase: SupabaseClient): ResetPasswordUseCase {
    const authRepository = SupabaseAuthRepository.create(supabase)
    return new ResetPasswordUseCase(authRepository)
  }

  async execute(params: ResetPasswordParams): Promise<ResetPasswordResult> {
    const { newPassword } = params

    try {
      // Usamos el repositorio en lugar de Supabase directamente
      const result = await this.authRepository.updateUser({
        data: { password: newPassword }
      })

      if (result.error) {
        console.error("Error al restablecer la contraseña:", result.error)
        return {
          success: false,
          error: result.error.message
        }
      }

      return {
        success: true
      }
    } catch (error: any) {
      console.error("Error inesperado en ResetPasswordUseCase:", error)
      return {
        success: false,
        error: error.message || "Error inesperado al restablecer la contraseña"
      }
    }
  }
} 