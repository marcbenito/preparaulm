import { AuthService, AuthServiceImpl } from '../../services/AuthServiceImpl'
import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseAuthRepository } from '../../repositories/AuthRepository'

export class LogoutUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    console.log("🔥🔥🔥 LogoutUserUseCase")
    return this.authService.logout()
  }

  static create(supabase: SupabaseClient): LogoutUserUseCase {
    const authRepository = new SupabaseAuthRepository(supabase)
    const authService = new AuthServiceImpl(authRepository)
    return new LogoutUserUseCase(authService)
  }
} 