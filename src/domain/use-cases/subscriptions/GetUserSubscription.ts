import { Subscription } from "@/domain/entities/Subscription"
import { SubscriptionRepository, SupabaseSubscriptionRepository } from "@/domain/repositories/SubscriptionRepository"
import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl"
import { SupabaseClient } from "@supabase/supabase-js"

export class GetUserSubscriptionUseCase {
  constructor(
    private authService: AuthService,
    private subscriptionRepository: SubscriptionRepository
  ) {}

  async execute(): Promise<Subscription | null> {
    try {
      const user = await this.authService.getCurrentUser()
      if (!user) return null

      return await this.subscriptionRepository.getUserSubscription(user.id)
    } catch (error) {
      console.error("Error getting user subscription:", error)
      return null
    }
  }
  static create(supabaseClient: SupabaseClient): GetUserSubscriptionUseCase {
    const authService = AuthServiceImpl.create(supabaseClient)
    const subscriptionRepository = SupabaseSubscriptionRepository.create(supabaseClient)
    return new GetUserSubscriptionUseCase(authService, subscriptionRepository)
  }
} 