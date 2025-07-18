import { TestRepositoryImpl } from '@/domain/repositories/TestRepository';
import { UserCategoryPerformanceService } from '@/domain/services/UserCategoryPerformanceService';
import { SupabaseClient } from '@supabase/supabase-js';
import { TestExecutionAnswer } from '@/domain/entities/TestExecution';
import { Question } from '@/domain/entities/Question';
import { CategoryRepositoryImpl, CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';
import { UserCategoryPerformanceRepository, UserCategoryPerformanceRepositoryImpl } from '../repositories/UserCategoryPerformanceRepository';
import { UserCategoryPerformance } from '../entities/UserCategoryPerformance';

export class CompleteTestExecutionUseCase {
  private supabase: SupabaseClient;
  private categoryRepository: CategoryRepository;
  private userCategoryPerformanceService: UserCategoryPerformanceService;
  private userCategoryPerformanceRepository: UserCategoryPerformanceRepository;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
    this.categoryRepository = new CategoryRepositoryImpl(this.supabase);
    this.userCategoryPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(this.supabase);
    this.userCategoryPerformanceService = new UserCategoryPerformanceService(this.supabase);
  }

  private ponderateDifficulty(difficulty: number) {
    switch(difficulty) {
      case 1:
        return 1;
      case 2:
        return 1.2;
      case 3:
        return 1.5;
      default:
        return 2;
    }
  }
  private calculateConfidence(totalQuestions: number, successRate: number) {
    /*
    NUEVA   Attempts < 5 Sin datos; hay que explorar.
    DÉBIL successRate < 55 % y attempts ≥ 5  Puntos flojos.
    REGULAR 55 % ≤ successRate < 70 %  Necesita afinar.
    FUERTE successRate 70 % ≤ successRate < 80 % Ya domina, sólo repaso esporádico.
    SUPERIOR successRate ≥ 80 % Ya domina, sólo repaso esporádico.
    */
        
    if (totalQuestions < 5) {
      return 0; // Nueva
    } else if (successRate < 55) {
      return 1; // Débil
    } else if (successRate < 70) {
      return 2; // Regular
    } else if (successRate < 80) {
      return 3; // Fuerte
    } else {
      return 4; // Superior
    }

    

  }
  
  private async calculateCategoryPerformance(categoryId: string, userId: string) {
    const subCategories = await this.userCategoryPerformanceRepository.getUserSubcategoriesPerformance(userId, categoryId);
    const categoryPerformance = await  this.userCategoryPerformanceRepository.getUserCategoryPerformance(userId, categoryId);
    if(!categoryPerformance) {
      return;
    }
    const parentCategoryId: string | null | undefined = categoryId;

    const categoryPerformanceResults:{
      questionsCompleted: number,
      questionsSuccess: number,
      questionsCompletedPond: number,
      questionsSuccessPond: number,
      minimumProgress: number,
      confidence: number
    } = subCategories?.reduce((acc, curr) => {
      console.log('CalculateGategoryPerformance Subcategory', curr.categoryId, curr);
      acc.questionsCompleted += curr.questionsCompleted;
      acc.questionsSuccess += curr.questionsSuccess;
      acc.questionsCompletedPond += curr.questionsCompletedPond;
      acc.questionsSuccessPond += curr.questionsSuccessPond;
      acc.minimumProgress += curr.minimumProgress* curr.weight/100;
      acc.confidence += curr.confidence * curr.weight/100;
      return acc;
    }, {questionsCompleted: 0, questionsSuccess: 0, questionsCompletedPond: 0, questionsSuccessPond: 0, minimumProgress: 0, confidence: 0}) || {questionsCompleted: 0, questionsSuccess: 0, questionsCompletedPond: 0, questionsSuccessPond: 0, minimumProgress: 0, confidence: 0};

    categoryPerformance.questionsCompleted = Math.round(categoryPerformanceResults.questionsCompleted);
    categoryPerformance.questionsSuccess = Math.round(categoryPerformanceResults.questionsSuccess);
    categoryPerformance.questionsCompletedPond = Math.round(categoryPerformanceResults.questionsCompletedPond);
    categoryPerformance.questionsSuccessPond = Math.round(categoryPerformanceResults.questionsSuccessPond);
    categoryPerformance.minimumProgress = Math.round(categoryPerformanceResults.minimumProgress);
    categoryPerformance.confidence = Math.round(categoryPerformanceResults.confidence);
    
    const categorySuccessRate = categoryPerformance.questionsCompletedPond > 0 
      ? (categoryPerformance.questionsSuccessPond / categoryPerformance.questionsCompletedPond) * 100 
      : 0;
    categoryPerformance.successRate = Math.round(categorySuccessRate * 100) / 100;
    categoryPerformance.confidence = this.calculateConfidence(categoryPerformance.questionsCompletedPond, categorySuccessRate);
    
    console.log('### Updating category wirh', categoryPerformance)
    await this.userCategoryPerformanceRepository.updateUserCategoryPerformance(categoryPerformance);

    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (category?.parentCategoryId) {
      console.log(`[CompleteTestExecutionUseCase] Propagating to parent category: ${category.parentCategoryId}`);
      await this.calculateCategoryPerformance(category.parentCategoryId, userId);
    }

    return 0;
  }
  private calculateMinimumProgress(totalQuestions: number) {
    const MINIMUM_QUESTIONS = 3
    if(totalQuestions >= MINIMUM_QUESTIONS) {
      return 100;
    }
    return totalQuestions * 100 / MINIMUM_QUESTIONS;
  }
 
  private async calculateNewSubcategoryPerformance(answer: TestExecutionAnswer, userId: string) : Promise<UserCategoryPerformance> {
    console.log(`[CompleteTestExecutionUseCase] Calculating new subcategory performance for category ${answer}`);
    const subcategoryPerformance = await this.userCategoryPerformanceRepository.getUserCategoryPerformance(userId, answer.categoryId);
    //const totalQuestions = await this.categoryRepository.getTotalQuestionsForCategory(answer.categoryId);
    
    if(!subcategoryPerformance){
      console.log(`[CompleteTestExecutionUseCase] Creating new subcategory performance for category ${answer.categoryId}`);
      const newSubcategoryPerformance: Partial<UserCategoryPerformance> = {
          userId: userId,
        categoryId: answer.categoryId,
        successRate: 0,
        lastTestDate: new Date(),
        testsCompleted: 0,
        questionsCompleted: 1,
        questionsSuccess: answer.isCorrect ? 1 : 0,
        questionsCompletedPond: this.ponderateDifficulty(answer.difficulty) ,
        questionsSuccessPond: answer.isCorrect ? this.ponderateDifficulty(answer.difficulty) : 0  ,
        minimumProgress: 0,
        confidence: 0
      }
      console.log(`[CompleteTestExecutionUseCase] New subcategory performance created: ${JSON.stringify(newSubcategoryPerformance)}`);
       await  this.userCategoryPerformanceRepository.createUserCategoryPerformance(newSubcategoryPerformance);
      return newSubcategoryPerformance as UserCategoryPerformance;
     
    }

    subcategoryPerformance.questionsSuccess += answer.isCorrect ? 1 : 0;
    subcategoryPerformance.questionsSuccessPond += answer.isCorrect ? this.ponderateDifficulty(answer.difficulty) : 0;
    subcategoryPerformance.questionsCompleted++;
    subcategoryPerformance.questionsCompletedPond += this.ponderateDifficulty(answer.difficulty);
    subcategoryPerformance.minimumProgress = this.calculateMinimumProgress(subcategoryPerformance.questionsCompleted);
    
    const successRate = subcategoryPerformance.questionsCompletedPond > 0 
      ? (subcategoryPerformance.questionsSuccessPond / subcategoryPerformance.questionsCompletedPond) * 100 
      : 0;
    subcategoryPerformance.confidence = this.calculateConfidence(subcategoryPerformance.questionsCompletedPond, successRate);
    await this.userCategoryPerformanceRepository.updateUserCategoryPerformance(subcategoryPerformance);
    
    return subcategoryPerformance;
  }
  // private async getCategoryHierarchy(categoryId: string, allCategoriesMap: Map<string, Category>): Promise<string[]> {
  //   const hierarchy: string[] = [];
  //   let currentId: string | null = categoryId;
  //   while (currentId) {
  //     hierarchy.push(currentId);
  //     const category = allCategoriesMap.get(currentId);
  //     currentId = category ? category.parentCategoryId : null;
  //   }
  //   return hierarchy.reverse();
  // }

  async execute(testExecutionId: number, userId: string) {
    console.log(`[CompleteTestExecutionUseCase] Starting execution for testExecutionId: ${testExecutionId}, userId: ${userId}`);

    const testRepository = new TestRepositoryImpl(this.supabase);

    const testExecutionResult = await testRepository.getTestExecution(testExecutionId);
    if (!testExecutionResult) {
      console.error(`[CompleteTestExecutionUseCase] Test execution with ID ${testExecutionId} not found.`);
      throw new Error(`Test execution with ID ${testExecutionId} not found.`);
    }


    console.log('[CompleteTestExecutionUseCase] Fetched testExecutionResult:', testExecutionResult);

    const answers: TestExecutionAnswer[] = testExecutionResult.answers || [];
    console.log('[CompleteTestExecutionUseCase] Extracted answers:', answers);
    if (answers.length === 0) {
        console.log('[CompleteTestExecutionUseCase] No answers found. Completing test with score 0.');
        const completedTest = await testRepository.completeTestExecution(testExecutionId, 0);
        return completedTest;
    }




    //Por cada subcategoría haremos un update  de subcategory_performance
    const categoriesToUpdate = []
    for (const answer of answers) {
      const subcategory = await this.calculateNewSubcategoryPerformance(answer, userId); 
      console.log(' calculated: Subcategory', subcategory);
      categoriesToUpdate.push(subcategory.categoryId);
    
    }
    console.log(' categoriesToUpdate', categoriesToUpdate);
    
    for(const categoryId of categoriesToUpdate) {
      console.log(`[CompleteTestExecutionUseCase] Calculating category performance for category ${categoryId}`);
      const category = await this.categoryRepository.getCategoryById(categoryId);
      console.log(`[CompleteTestExecutionUseCase] Category` ,category);
      if(!category?.parentCategoryId) {
        throw new Error(`Category ${categoryId} has no parent category.`);
        break;
      }
      await this.calculateCategoryPerformance(category?.parentCategoryId, userId);
    
    }

  
    const uniqueQuestionIds = answers
      .map(a => a.questionId)
      .filter((value, index, self) => self.indexOf(value) === index);
    console.log('[CompleteTestExecutionUseCase] Unique question IDs:', uniqueQuestionIds);


    const overallCorrectAnswers = answers.filter(a => a.isCorrect).length;
    const overallTotalQuestions = answers.length;
    const overallCalculatedScore = overallTotalQuestions > 0 ? (overallCorrectAnswers / overallTotalQuestions) * 100 : 0;
    console.log(`[CompleteTestExecutionUseCase] Overall score calculated: ${overallCalculatedScore} (Correct: ${overallCorrectAnswers}, Total: ${overallTotalQuestions})`);

    const completedTestExecution = await testRepository.completeTestExecution(
      testExecutionId,
      overallCalculatedScore
    );
    console.log('[CompleteTestExecutionUseCase] Test execution completed in DB:', completedTestExecution);




    console.log('[CompleteTestExecutionUseCase] Finished execution.');
    return completedTestExecution;
  }
} 