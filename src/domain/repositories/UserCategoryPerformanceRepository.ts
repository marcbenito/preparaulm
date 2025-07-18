import { UserCategoryPerformance } from "../entities/UserCategoryPerformance";

// Define a type for the creation data, containing only properties
type CreateUserCategoryPerformanceData = {
  userId: string;
  categoryId: string;
  successRate: number;
  lastTestDate: Date;
  testsCompleted: number;
  questionsCompleted: number;
  questionsSuccess: number;
  questionsCompletedPond?: number;
  questionsSuccessPond?: number;
  minimumProgress?: number;
  confidence?: number;
  weight?: number;
};

export interface UserCategoryPerformanceRepository {
  getUserCategoryPerformances(userId: string): Promise<UserCategoryPerformance[]>;
  getUserCategoryPerformance(userId: string, categoryId: string): Promise<UserCategoryPerformance | null>;
  createUserCategoryPerformance(performanceData: Partial<UserCategoryPerformance>): Promise<UserCategoryPerformance>;
  updateUserCategoryPerformance(performance: UserCategoryPerformance): Promise<UserCategoryPerformance>;
  getUserSubcategoriesPerformance(userId: string, categoryId: string): Promise<UserCategoryPerformance[] | null>;
  getUserCategorySuccessRate(userId: string, categoryId: string): Promise<number>;
  getUserAverageSuccessRate(userId: string): Promise<number>;
}

// Implementation of the repository
export class UserCategoryPerformanceRepositoryImpl implements UserCategoryPerformanceRepository {
  constructor(private supabase: any) {}

  async getUserCategoryPerformances(userId: string): Promise<UserCategoryPerformance[]> {
    const { data, error } = await this.supabase
      .from('user_category_performance')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    // Ensure UserCategoryPerformance.fromDB is accessible and correct
    return data.map((item: any) => UserCategoryPerformance.fromDB(item));
  }

  async getUserCategoryPerformance(userId: string, categoryId: string): Promise<UserCategoryPerformance | null> {
    const { data, error } = await this.supabase
      .from('user_category_performance')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .maybeSingle();

    if (error) throw error;
    return data ? UserCategoryPerformance.fromDB(data) : null;
  }

  async createUserCategoryPerformance(performanceData: CreateUserCategoryPerformanceData): Promise<UserCategoryPerformance> {
    // Map the entity data to the expected database columns
    // Assuming UserCategoryPerformance entity properties match or have a toDB method
    // If UserCategoryPerformance has a static method to map data for DB, use it here.
    // Otherwise, manually map properties:
    const dbData = {
      user_id: performanceData.userId,
      category_id: performanceData.categoryId,
      success_rate: performanceData.successRate,
      last_test_date: performanceData.lastTestDate,
      tests_completed: performanceData.testsCompleted,
      questions_completed: performanceData.questionsCompleted,
      questions_success: performanceData.questionsSuccess,
      questions_total_pond: performanceData.questionsCompletedPond || 0,
      questions_success_pond: performanceData.questionsSuccessPond || 0,
      minimum_progress: Math.round(performanceData.minimumProgress || 0),
      confidence: Math.round(performanceData.confidence || 0) ,
      weight: performanceData.weight || 0,
      // Do not include 'id' as it's auto-generated
    };

    const { error , data } = await this.supabase
      .from('user_category_performance')
      .insert(dbData)
      .select()
      .single();

    if (error) {
      console.error("Error creating user category performance:", error);
      throw error;
    }
    return data;
  }

  async updateUserCategoryPerformance(performance: UserCategoryPerformance): Promise<UserCategoryPerformance> {
    const { error , data } = await this.supabase
      .from('user_category_performance')
      .update({
        success_rate: performance.successRate,
        last_test_date: performance.lastTestDate,
        tests_completed: performance.testsCompleted,
        questions_completed: performance.questionsCompleted,
        questions_success: performance.questionsSuccess,
        questions_total_pond: performance.questionsCompletedPond,
        questions_success_pond: performance.questionsSuccessPond,
        minimum_progress: Math.round(performance.minimumProgress || 0),
        confidence: Math.round(performance.confidence || 0),
        weight: performance.weight
      }) // Ensure these properties match the UserCategoryPerformance entity
      .eq('user_id', performance.userId)
      .eq('category_id', performance.categoryId);

    if (error) throw error;
    return data;
  }

  async getUserSubcategoriesPerformance(userId: string, categoryId: string): Promise<UserCategoryPerformance[] | null> {
    const { data, error } = await this.supabase
      .from('user_category_performance')
      .select(`
        *,
        categories!inner(id, parent_category_id, weight)
      `)
      .eq('user_id', userId)
      .eq('categories.parent_category_id', categoryId);

    if (error) throw error;
    return data ? data.map((item: any) => {
      const performance = UserCategoryPerformance.fromDB(item);
      // Sobrescribir el weight con el valor de la tabla categories
      performance.weight = item.categories?.weight || 0;
      return performance;
    }) : null;
  }

  async getUserCategorySuccessRate(userId: string, categoryId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('user_category_performance')
      .select('success_rate')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return data ? data.success_rate : 0;
  }

  async getUserAverageSuccessRate(userId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('user_category_performance')
      .select('success_rate')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      return 0;
    }
    
    const average = data.reduce((acc: number, perf: any) => acc + perf.success_rate, 0) / data.length;
    return Math.max(0, Math.min(100, average));
  }
} 