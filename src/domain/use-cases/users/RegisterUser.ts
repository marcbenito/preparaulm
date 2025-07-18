import { AuthService, AuthServiceImpl } from "@/domain/services/AuthServiceImpl";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { CategoryRepository, CategoryRepositoryImpl } from "@/domain/repositories/CategoryRepository";
import { UserCategoryPerformanceRepository, UserCategoryPerformanceRepositoryImpl } from "@/domain/repositories/UserCategoryPerformanceRepository";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseAuthRepository } from "@/domain/repositories/AuthRepository";

// Renamed interface to match original file pattern (RegisterUserInput)
// but kept the structure from the new logic
export interface RegisterUserInput { 
  email: string;
  password: string;
  name: string;
}

// Renamed interface to match the pattern (RegisterUserResult)
export interface RegisterUserResult { 
  success: boolean;
  userId?: string;
  error?: string;
}

// Kept the original class name RegisterUserUseCase
export class RegisterUserUseCase {
  constructor(
    private readonly authService: AuthService, 
    private readonly userRepository: UserRepository, 
    private readonly categoryRepository: CategoryRepository, 
    private readonly userCategoryPerformanceRepository: UserCategoryPerformanceRepository
  ) {}

  // Replaced the execute method with the comprehensive logic
  async execute(params: RegisterUserInput): Promise<RegisterUserResult> {
    let userId: string | undefined = undefined;
    try {
      // 1. Register the user
      let registerResult;
      try {
        registerResult = await this.authService.register(params.name, params.email, params.password);
      } catch (authError: unknown) {
        const errorMessage = authError instanceof Error ? authError.message : "Failed to register user due to an unexpected error.";
        console.error(`Registration Service Error: ${errorMessage}`);
        return { success: false, error: errorMessage };
      }

      // Check AuthResult structure: { user: User, token: string }
      if (!registerResult?.user?.id) {
        const errorMessage = "Registration completed but user ID is missing.";
        console.error(errorMessage);
        return { success: false, error: errorMessage };
      }
      userId = registerResult.user.id; // Assign confirmed userId

      if (typeof userId !== 'string') {
        const errorMsg = "Invalid User ID received after registration.";
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      // 2. Create/Update the user profile
      const profileSuccess = await this.userRepository.createUserProfile(userId, {
        name: params.name,
      });

      if (!profileSuccess) {
        const errorMsg = "Failed to create/update user profile after registration.";
        console.error(errorMsg + ` (User ID: ${userId})`);
        return { success: false, error: errorMsg, userId };
      }

      // 3. Get root categories directly
      const rootCategories = await this.categoryRepository.getRootCategories();
      if (!rootCategories) {
        const errorMsg = "Failed to retrieve root categories for initial performance setup.";
        console.error(errorMsg + ` (User ID: ${userId})`);
        return { success: false, error: errorMsg, userId };
      }

      // 4. Create initial performance records for each root category
      if (rootCategories.length > 0) {
        for (const category of rootCategories) {
          try {
            // Call createUserCategoryPerformance with the data directly
            await this.userCategoryPerformanceRepository.createUserCategoryPerformance({
              userId: userId,
              categoryId: category.id,
              successRate: 0,
              lastTestDate: new Date(),
              testsCompleted: 0,
              questionsCompleted: 0
            });
          } catch (perfError: unknown) {
            const errorMsg = `Failed to save initial performance for category ${category.id}.`;
            console.error(errorMsg, perfError);
            return { success: false, error: errorMsg + (perfError instanceof Error ? ` Reason: ${perfError.message}` : ''), userId };
          }
        }
      }

      return { success: true, userId: userId };

    } catch (error: unknown) {
      console.error('Unexpected error during registration process:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during registration.';
      return { success: false, error: errorMessage, userId };
    }
  }
  static create(supabase: SupabaseClient): RegisterUserUseCase {
    const authService = new AuthServiceImpl(new SupabaseAuthRepository(supabase));
    const userRepository = new UserRepository(supabase);
    const categoryRepository = new CategoryRepositoryImpl(supabase);
    const userCategoryPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(supabase);
    return new RegisterUserUseCase(authService, userRepository, categoryRepository, userCategoryPerformanceRepository);
  }
} 