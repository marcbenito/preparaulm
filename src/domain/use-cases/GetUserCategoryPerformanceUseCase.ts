import { UserCategoryPerformance } from "../entities/UserCategoryPerformance";
import { UserCategoryPerformanceRepository, UserCategoryPerformanceRepositoryImpl } from "../repositories/UserCategoryPerformanceRepository";
import { SupabaseClient } from "@supabase/supabase-js";

export class GetUserCategoryPerformanceUseCase {
  constructor(private userCategoryPerformanceRepository: UserCategoryPerformanceRepository) {}

  async execute(userId: string): Promise<UserCategoryPerformance[]> {
    return this.userCategoryPerformanceRepository.getUserCategoryPerformances(userId);
  }

  static create(supabase: SupabaseClient): GetUserCategoryPerformanceUseCase {
    const repository = new UserCategoryPerformanceRepositoryImpl(supabase);
    return new GetUserCategoryPerformanceUseCase(repository);
  }
} 