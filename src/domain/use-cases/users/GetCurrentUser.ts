import { User } from "@/domain/entities/User"
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseAuthRepository } from "@/domain/repositories/AuthRepository"

export class GetCurrentUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<User | null> {
    return this.authService.getCurrentUser()
  }

  static create(supabase: SupabaseClient): GetCurrentUserUseCase {
    const authRepository = new SupabaseAuthRepository(supabase)
    const authService = new AuthServiceImpl(authRepository)
    return new GetCurrentUserUseCase(authService)
  }
} 