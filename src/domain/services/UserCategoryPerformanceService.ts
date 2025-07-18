import { UserCategoryPerformanceRepository, UserCategoryPerformanceRepositoryImpl } from "@/domain/repositories/UserCategoryPerformanceRepository";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserCategoryPerformanceService {
  private userCategoryPerformanceRepository: UserCategoryPerformanceRepository;

  constructor(supabase: SupabaseClient) {
    this.userCategoryPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(supabase);
  }

  async updatePerformanceMetrics(
    userId: string, 
    categoryId: string, 
    testScore: number,
    questionsCompletedIncrement: number = 0 // Retaining default from original use case
  ): Promise<void> {
    let performance = await this.userCategoryPerformanceRepository.getUserCategoryPerformance(userId, categoryId);
    
    if (performance) {
      const newTestsCompleted = performance.testsCompleted + 1;
      const newSuccessRate = (
        (performance.successRate * performance.testsCompleted) + testScore
      ) / newTestsCompleted;
      
      performance.successRate = Math.round(newSuccessRate * 100) / 100;
      performance.testsCompleted = newTestsCompleted;
      performance.lastTestDate = new Date();
      performance.questionsCompleted += questionsCompletedIncrement;
      
      await this.userCategoryPerformanceRepository.updateUserCategoryPerformance(performance);
    } else {
      await this.userCategoryPerformanceRepository.createUserCategoryPerformance({
        userId: userId,
        categoryId: categoryId,
        successRate: testScore,
        lastTestDate: new Date(),
        testsCompleted: 1,
        questionsCompleted: questionsCompletedIncrement
      });
    }
  }
} 