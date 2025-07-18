import {  SupabaseAuthRepository } from "@/domain/repositories/AuthRepository"
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { SupabaseClient } from "@supabase/supabase-js"

export interface LoginUserUseCaseParams {
  email: string
  password: string
}
export interface LoginUserUseCaseResult {
  success: boolean
  error?: string
}

export class LoginUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(input: LoginUserUseCaseParams): Promise<LoginUserUseCaseResult > {
    console.log("🔥🔥🔥 LoginUserUseCase")
    const { email, password } = input
    
    // Validar entrada
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos")
    }
    
    // Delegar al servicio de autenticación
    try { 
      const result = await this.authService.login(email, password)
      return {
        success: result !== null
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  static create(supabase: SupabaseClient){
    const authService = new AuthServiceImpl(new SupabaseAuthRepository(supabase))
    return new LoginUserUseCase(authService)
  }
} 

