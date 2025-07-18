


import { UserRepository } from "@/domain/repositories/UserRepository"
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { SupabaseClient } from "@supabase/supabase-js"

export interface UserProfileResponse {
    id: string
    email: string
    name: string
    role: string
    createdAt: string
    updatedAt: string
    phone: string
    avatarUrl: string | null
}
export type GetUserProfileUseCaseResponse = {
  user: UserProfileResponse | null
  error?: string
}

export class GetUserProfileUseCase {
  constructor(private authService: AuthService, private userRepository: UserRepository) {}

  async execute(): Promise<GetUserProfileUseCaseResponse> {
    try {
      const user = await this.authService.getCurrentUser()
      if (!user) return {user: null, error: 'User not found'}
      

      const userProfile = await this.userRepository.getUserProfile(user.id)

      return {
        user:{
        id: user.id,
        email: user.email || '',
        name: userProfile?.name || '',
        role: userProfile?.role || '',
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        phone: userProfile?.phone || '',
        avatarUrl: userProfile?.avatarUrl || null
      }
    }
    } catch (error) {
      console.error('Error getting user profile:', error)
      return {error: 'Error getting user profile', user: null}
    }
  }
  static create(supabaseClient: SupabaseClient): GetUserProfileUseCase {
    const userRepository = UserRepository.create(supabaseClient)
    const authService =  AuthServiceImpl.create(supabaseClient)
    return new GetUserProfileUseCase(authService, userRepository)
  }
} 