import { SupabaseAuthRepository } from "@/domain/repositories/AuthRepository";
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { createClient } from "@/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js";

export interface ChangePasswordParams {
  currentPassword: string
  newPassword: string
}

export class ChangePasswordUseCase {
  constructor(private authService: AuthService) {}

  async execute({ currentPassword, newPassword }: ChangePasswordParams): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient()
      
      // First verify the current password by attempting to sign in
      const user = await this.authService.getCurrentUser()
      if (!user || !user.email) {
        return { 
          success: false,
          error: "No se encontró el usuario actual"
        }
      }

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInError) {
        return { 
          success: false,
          error: "La contraseña actual es incorrecta"
        }
      }

      // Password is correct, now update to the new one
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        return { 
          success: false,
          error: updateError.message
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error changing password:', error)
      return { 
        success: false,
        error: "Error al cambiar la contraseña. Inténtalo de nuevo."
      }
    }
  }
  static create(supabaseClient: SupabaseClient): ChangePasswordUseCase {

    const authService =  AuthServiceImpl.create(supabaseClient)
    return new ChangePasswordUseCase(authService)
  }
} 