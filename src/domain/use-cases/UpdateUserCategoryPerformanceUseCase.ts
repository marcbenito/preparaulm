import { UserCategoryPerformanceRepository, UserCategoryPerformanceRepositoryImpl } from "../repositories/UserCategoryPerformanceRepository";
import { UserCategoryPerformance } from "../entities/UserCategoryPerformance";
import { SupabaseClient } from "@supabase/supabase-js";

export class UpdateUserCategoryPerformanceUseCase {
  constructor(
    private userCategoryPerformanceRepository: UserCategoryPerformanceRepository
  ) {}

  async execute(
    userId: string, 
    categoryId: string, 
    testScore: number,
    questionsCompletedIncrement: number = 0
  ): Promise<void> {
    // Buscar rendimiento existente o crear uno nuevo
    let performance = await this.userCategoryPerformanceRepository.getUserCategoryPerformance(userId, categoryId);
    
    if (performance) {
      // Actualizar rendimiento existente
      const newTestsCompleted = performance.testsCompleted + 1;
      // Calcular la nueva tasa de éxito (promedio ponderado con el nuevo test)
      const newSuccessRate = (
        (performance.successRate * performance.testsCompleted) + testScore
      ) / newTestsCompleted;
      
      performance.successRate = Math.round(newSuccessRate * 100) / 100; // Redondear a 2 decimales
      performance.testsCompleted = newTestsCompleted;
      performance.lastTestDate = new Date();
      performance.questionsCompleted += questionsCompletedIncrement;
      
      await this.userCategoryPerformanceRepository.updateUserCategoryPerformance(performance);
    } else {
      // Crear nuevo registro de rendimiento
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
  static create(supabase: SupabaseClient): UpdateUserCategoryPerformanceUseCase {
    const userCategoryPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(supabase);
    return new UpdateUserCategoryPerformanceUseCase(userCategoryPerformanceRepository);
  }
} 