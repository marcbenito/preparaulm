import { User } from "@/domain/entities/User"
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { UserRepository } from "@/domain/repositories/UserRepository"
import { SupabaseClient } from "@supabase/supabase-js"

export interface UpdateUserProfileUseCaseParams {
  name: string
  avatarUrl?: string
  phone?: string
}


export interface UpdateUserProfileUseCaseResult {

    avatarUrl?: string
    name?: string
    phone?: string

  error?: string
}

export class UpdateUserProfileUseCase {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository
  ) {}

  async execute(data: UpdateUserProfileUseCaseParams): Promise<UpdateUserProfileUseCaseResult | null> {
    try {
      const user = await this.authService.getCurrentUser()
      if (!user) return null

      // Actualizar todos los campos del perfil de usuario en user_profiles
      const success = await this.userRepository.updateUserProfile(user.id, {
        name: data.name,
        phone: data.phone,
        avatarUrl: data.avatarUrl
      });

      if (!success) {
        return {
          error: "No se pudo actualizar el perfil"
        };
      }

      return {
       avatarUrl: data.avatarUrl,
        name: data.name,
        phone: data.phone 
       
      }
    } catch (error) {
      console.error('Error updating user profile:', error)
      return null
    }
  }
  static create(supabaseClient: SupabaseClient): UpdateUserProfileUseCase {
    const authService = AuthServiceImpl.create(supabaseClient)
    const userRepository = UserRepository.create(supabaseClient)
    return new UpdateUserProfileUseCase(authService, userRepository)
  }
} 