import { SupabaseClient } from '@supabase/supabase-js';
import { TestRepositoryImpl } from '@/domain/repositories/TestRepository';
import { CategoryRepositoryImpl } from '@/domain/repositories/CategoryRepository';
import { UserCategoryPerformanceRepositoryImpl } from '@/domain/repositories/UserCategoryPerformanceRepository';

// Define core interfaces used within this use case
interface QuestionOption {
  key: string; // 'A', 'B', 'C', 'D'
  value: string; // The actual text of the option
}

interface QuestionFromDB {
  id: number;
  category_id: string;
  text: string;
  options: any; // JSONB from DB, expected to be QuestionOption[] or stringified JSON
  correct_answer: string; // e.g., 'A'
  explanation?: string | null;
  difficulty: number; // DB difficulty: 1, 2, 3, 4, 5
}

interface SelectedQuestionInternal extends QuestionFromDB {
  parsed_options: QuestionOption[];
  mapped_difficulty: 1 | 2 | 3 | 4; // D1, D2, D3, D4 (Internal representation)
}

// Minimal interface for UserCategoryPerformance needed by this use case
interface UserCategoryPerformanceInfo {
  success_rate: number;
}


interface GenerateTestParams {
  userId: string;
  baseCategoryId?: string;
  testId?: number;
}

const TOTAL_QUESTIONS_PER_TEST = 10;

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

interface PrioritizedSubcategory {
  categoryId: string;
  minimumProgress: number;
  priority: 'high' | 'medium' | 'low';
  weight: number;
}

export class GenerateTestUseCase {
  private testRepository: TestRepositoryImpl;
  private categoryRepository: CategoryRepositoryImpl;
  private userPerformanceRepository: UserCategoryPerformanceRepositoryImpl;

  constructor(supabase: SupabaseClient) {
    this.testRepository = new TestRepositoryImpl(supabase);
    this.categoryRepository = new CategoryRepositoryImpl(supabase);
    this.userPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(supabase);
  }

  public static create(supabase: SupabaseClient): GenerateTestUseCase {
    return new GenerateTestUseCase(supabase);
  }

  private mapDBDifficultyToInternal(dbDifficulty: number): 1 | 2 | 3 | 4 {
    if (dbDifficulty === 1) return 1; // D1
    if (dbDifficulty === 2) return 2; // D2
    if (dbDifficulty === 3) return 3; // D3
    if (dbDifficulty === 4 || dbDifficulty === 5) return 4; // D4 (DB 4 and 5 map to internal D4)
    console.warn(`GenerateTestUseCase: Unknown DB difficulty encountered: ${dbDifficulty}, defaulting to D1.`);
    return 1; // Default to D1 if unknown
  }

  private getDifficultyDistribution(successRate: number): Record<1 | 2 | 3 | 4, number> {
    const sr = Math.max(0, Math.min(100, successRate)); // Clamp between 0 and 100

    if (sr === 0) return { 1: 7, 2: 3, 3: 0, 4: 0 };         // 70% D1, 30% D2
    if (sr < 50) return { 1: 6, 2: 3, 3: 1, 4: 0 };          // 60% D1, 30% D2, 10% D3
    if (sr < 70) return { 1: 3, 2: 4, 3: 3, 4: 0 };          // 30% D1, 40% D2, 30% D3
    if (sr < 90) return { 1: 2, 2: 3, 3: 4, 4: 1 };          // 20% D1, 30% D2, 40% D3, 10% D4
    return { 1: 1, 2: 2, 3: 3, 4: 4 };                       // 10% D1, 20% D2, 30% D3, 40% D4
  }

  private parseQuestionOptions(optionsFromDB: any): QuestionOption[] {
    if (typeof optionsFromDB === 'string') {
      try {
        const parsed = JSON.parse(optionsFromDB);
        if (Array.isArray(parsed) && parsed.every(opt => opt && typeof opt.key === 'string' && typeof opt.value === 'string')) {
          return parsed as QuestionOption[];
        }
      } catch (e) {
        console.error('GenerateTestUseCase: Failed to parse question options string:', e);
      }
    } else if (Array.isArray(optionsFromDB) && optionsFromDB.every(opt => opt && typeof opt.key === 'string' && typeof opt.value === 'string')) {
      return optionsFromDB as QuestionOption[];
    }
    console.warn('GenerateTestUseCase: Question options are not in expected format for a question, returning empty array.');
    return [];
  }

  private async getPrioritizedSubcategories(userId: string, baseCategoryId: string): Promise<PrioritizedSubcategory[]> {
    console.log(`GenerateTestUseCase: Getting prioritized subcategories for ${baseCategoryId}`);

    return await this.categoryRepository.getPrioritizedSubcategories(userId, baseCategoryId);
  }

  private calculateQuestionDistribution(prioritizedSubcategories: PrioritizedSubcategory[], totalQuestions: number): Record<string, number> {
    console.log(`GenerateTestUseCase: Calculating question distribution for ${totalQuestions} questions`);

    const distribution: Record<string, number> = {};

    if (prioritizedSubcategories.length === 0) {
      return distribution;
    }

    // Separar por prioridad
    const highPriority = prioritizedSubcategories.filter(sc => sc.priority === 'high');
    const mediumPriority = prioritizedSubcategories.filter(sc => sc.priority === 'medium');
    const lowPriority = prioritizedSubcategories.filter(sc => sc.priority === 'low');

    let remainingQuestions = totalQuestions;

    // Asignar preguntas a subcategorías de alta prioridad (60% del total)
    if (highPriority.length > 0) {
      const questionsForHigh = Math.floor(totalQuestions * 0.6);
      const questionsPerHighCategory = Math.max(1, Math.floor(questionsForHigh / highPriority.length));

      highPriority.forEach(sc => {
        const assigned = Math.min(questionsPerHighCategory, remainingQuestions);
        distribution[sc.categoryId] = assigned;
        remainingQuestions -= assigned;
      });
    }

    // Asignar preguntas a subcategorías de prioridad media (30% del total)
    if (mediumPriority.length > 0 && remainingQuestions > 0) {
      const questionsForMedium = Math.floor(totalQuestions * 0.3);
      const questionsPerMediumCategory = Math.max(1, Math.floor(questionsForMedium / mediumPriority.length));

      mediumPriority.forEach(sc => {
        if (remainingQuestions > 0) {
          const assigned = Math.min(questionsPerMediumCategory, remainingQuestions);
          distribution[sc.categoryId] = assigned;
          remainingQuestions -= assigned;
        }
      });
    }

    // Asignar preguntas restantes a subcategorías de baja prioridad
    if (lowPriority.length > 0 && remainingQuestions > 0) {
      const questionsPerLowCategory = Math.max(1, Math.floor(remainingQuestions / lowPriority.length));

      lowPriority.forEach(sc => {
        if (remainingQuestions > 0) {
          const assigned = Math.min(questionsPerLowCategory, remainingQuestions);
          distribution[sc.categoryId] = assigned;
          remainingQuestions -= assigned;
        }
      });
    }

    // Distribuir preguntas sobrantes priorizando alta prioridad
    const allCategories = [...highPriority, ...mediumPriority, ...lowPriority];
    let categoryIndex = 0;
    while (remainingQuestions > 0 && categoryIndex < allCategories.length) {
      const sc = allCategories[categoryIndex];
      distribution[sc.categoryId] = (distribution[sc.categoryId] || 0) + 1;
      remainingQuestions--;
      categoryIndex = (categoryIndex + 1) % allCategories.length;
    }

    console.log(`GenerateTestUseCase: Question distribution:`,
      Object.entries(distribution).map(([cat, count]) => `${cat}: ${count}`).join(', '));

    return distribution;
  }

  private prioritizeQuestionsByCategory(questions: SelectedQuestionInternal[], distribution: Record<string, number>): SelectedQuestionInternal[] {
    console.log(`GenerateTestUseCase: Prioritizing ${questions.length} questions by category distribution`);

    const prioritizedQuestions: SelectedQuestionInternal[] = [];
    const questionsByCategory: Record<string, SelectedQuestionInternal[]> = {};

    // Agrupar preguntas por categoría
    questions.forEach(q => {
      if (!questionsByCategory[q.category_id]) {
        questionsByCategory[q.category_id] = [];
      }
      questionsByCategory[q.category_id].push(q);
    });

    // Seleccionar preguntas según la distribución
    Object.entries(distribution).forEach(([categoryId, targetCount]) => {
      const availableQuestions = questionsByCategory[categoryId] || [];
      shuffleArray(availableQuestions);

      const selectedFromCategory = availableQuestions.slice(0, targetCount);
      prioritizedQuestions.push(...selectedFromCategory);

      console.log(`GenerateTestUseCase: Selected ${selectedFromCategory.length}/${targetCount} questions from ${categoryId}`);
    });

    // Si no tenemos suficientes preguntas, añadir las restantes aleatoriamente
    if (prioritizedQuestions.length < TOTAL_QUESTIONS_PER_TEST) {
      const remainingQuestions = questions.filter(q =>
        !prioritizedQuestions.some(pq => pq.id === q.id)
      );

      shuffleArray(remainingQuestions);
      const needed = TOTAL_QUESTIONS_PER_TEST - prioritizedQuestions.length;
      prioritizedQuestions.push(...remainingQuestions.slice(0, needed));

      console.log(`GenerateTestUseCase: Added ${Math.min(needed, remainingQuestions.length)} additional questions`);
    }

    return prioritizedQuestions;
  }

  private async getQuestionsFromSpecificTest(testId: number): Promise<SelectedQuestionInternal[]> {
    console.log(`GenerateTestUseCase: Loading questions from specific test ID: ${testId}`);

    const test = await this.testRepository.getTestById(testId);
    if (!test || !test.questions || test.questions.length === 0) {
      throw new Error(`GenerateTestUseCase: Test with ID ${testId} not found or has no questions`);
    }

    const questionIds = test.questions.map(tq => tq.questionId);
    console.log(`GenerateTestUseCase: Found ${questionIds.length} questions in test ${testId}. Question IDs: ${questionIds.join(', ')}`);

    const questions = await this.testRepository.getQuestionsByIds(questionIds);

    const selectedQuestions: SelectedQuestionInternal[] = questions.map(q => ({
      id: q.id,
      category_id: q.categoryId,
      text: q.text,
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
      parsed_options: this.parseQuestionOptions(q.options),
      mapped_difficulty: this.mapDBDifficultyToInternal(q.difficulty),
    })).filter(q => {
      if (q.parsed_options.length === 0) {
        console.warn(`GenerateTestUseCase: Question ID ${q.id} from test ${testId} filtered out due to invalid/empty options.`);
        return false;
      }
      return true;
    });

    console.log(`GenerateTestUseCase: Successfully loaded ${selectedQuestions.length} valid questions from test ${testId}`);
    return selectedQuestions;
  }


  async execute({ userId, baseCategoryId, testId }: GenerateTestParams): Promise<number> {
    console.log(`
--- GenerateTestUseCase: Starting Test Generation ---`);

    if (testId) {
      console.log(`User ID: ${userId}, Specific Test ID: ${testId}`);

      // Flujo para test específico
      const selectedQuestions = await this.getQuestionsFromSpecificTest(testId);

      // Para tests específicos, mantenemos el orden original pero mezclamos las opciones
      shuffleArray(selectedQuestions);
      console.log(`GenerateTestUseCase: Final selected questions count: ${selectedQuestions.length}. IDs: ${selectedQuestions.map(q => q.id).join(', ')}`);

      const testExecution = await this.testRepository.createTestExecution(testId, userId);
      const testExecutionId = testExecution.id;

      await this.testRepository.saveTestQuestions(testExecutionId, selectedQuestions);

      console.log(`GenerateTestUseCase: Successfully created test execution ID: ${testExecutionId} from specific test ${testId} with ${selectedQuestions.length} questions.`);
      console.log(`--- GenerateTestUseCase: Test Generation Ended ---`);
      return testExecutionId;
    }

    // Flujo original para generación dinámica por categoría
    console.log(`User ID: ${userId}, Category ID: ${baseCategoryId || 'generic'}`);

    const answeredQuestionIds = await this.testRepository.getUserAnsweredQuestionIds(userId);
    console.log(`GenerateTestUseCase: User has answered ${answeredQuestionIds.size} unique questions previously. IDs: ${Array.from(answeredQuestionIds).join(', ')}`);

    // Obtener subcategorías priorizadas por minimum_progress
    let relevantCategoryIds: string[] = [];
    let prioritizedSubcategories: PrioritizedSubcategory[] = [];

    if (baseCategoryId) {
      relevantCategoryIds.push(baseCategoryId);
      prioritizedSubcategories = await this.getPrioritizedSubcategories(userId, baseCategoryId);
      relevantCategoryIds.push(...prioritizedSubcategories.map(sc => sc.categoryId));
    }
    console.log(`GenerateTestUseCase: Relevant category IDs for question fetching: ${relevantCategoryIds.join(', ') || 'ALL (generic test)'}`);

    let successRate = 0;
    if (baseCategoryId) {
      successRate = await this.userPerformanceRepository.getUserCategorySuccessRate(userId, baseCategoryId);
      console.log(`GenerateTestUseCase: Performance for category ${baseCategoryId}: ${successRate}%`);
    } else {
      successRate = await this.userPerformanceRepository.getUserAverageSuccessRate(userId);
      console.log(`GenerateTestUseCase: Average performance: ${successRate}%`);
    }
    successRate = Math.max(0, Math.min(100, successRate));
    console.log(`GenerateTestUseCase: Final calculated success rate: ${successRate}%`);

    const difficultyDistributionTargets = this.getDifficultyDistribution(successRate);
    console.log('GenerateTestUseCase: Target difficulty distribution:', difficultyDistributionTargets);

    let selectedQuestions: SelectedQuestionInternal[] = [];
    let attemptPreviouslyAnswered = false;

    for (let attempt = 1; attempt <= 2; attempt++) {
      console.log(`
--- Question Fetching Attempt: ${attempt} (Previously Answered Allowed: ${attemptPreviouslyAnswered}) ---`);
      if (selectedQuestions.length >= TOTAL_QUESTIONS_PER_TEST) {
        console.log('GenerateTestUseCase: Target question count met, skipping further attempts.');
        break;
      }

      const candidateQuestionsDB = await this.testRepository.getCandidateQuestions(relevantCategoryIds, answeredQuestionIds, attemptPreviouslyAnswered);

      console.log(`GenerateTestUseCase: Querying with category IDs: ${relevantCategoryIds.join(', ') || 'ALL'}`);

      if (attemptPreviouslyAnswered) {
        console.log('GenerateTestUseCase: Including previously answered questions in this attempt.');
      } else {
        console.log(`GenerateTestUseCase: Excluding ${answeredQuestionIds.size} previously answered question IDs.`);
      }

      if (!candidateQuestionsDB || candidateQuestionsDB.length === 0) {
        console.log(`GenerateTestUseCase: No candidate questions found from DB query (attempt ${attempt}).`);
        if (attempt === 1 && answeredQuestionIds.size > 0 && !attemptPreviouslyAnswered) {
          attemptPreviouslyAnswered = true;
          console.log("GenerateTestUseCase: Will retry fetch including previously answered questions.");
          continue;
        }
        break;
      }
      console.log(`GenerateTestUseCase: Fetched ${candidateQuestionsDB.length} raw candidate questions from DB (attempt ${attempt}).`);

      let availableCandidates: SelectedQuestionInternal[] = candidateQuestionsDB.map(q => ({
        ...q,
        parsed_options: this.parseQuestionOptions(q.options),
        mapped_difficulty: this.mapDBDifficultyToInternal(q.difficulty),
      })).filter(q => {
        if (q.parsed_options.length === 0) {
          console.warn(`GenerateTestUseCase: Question ID ${q.id} filtered out due to invalid/empty options.`);
          return false;
        }
        return true;
      });
      console.log(`GenerateTestUseCase: ${availableCandidates.length} candidates after parsing options (attempt ${attempt}).`);

      const currentSelectedIds = new Set(selectedQuestions.map(sq => sq.id));
      availableCandidates = availableCandidates.filter(q => !currentSelectedIds.has(q.id));
      console.log(`GenerateTestUseCase: ${availableCandidates.length} candidates after filtering already selected ones (attempt ${attempt}).`);

      shuffleArray(availableCandidates);

      const questionsByDifficulty: Record<number, SelectedQuestionInternal[]> = { 1: [], 2: [], 3: [], 4: [] };
      availableCandidates.forEach(q => {
        const difficultyKey = q.mapped_difficulty as (1 | 2 | 3 | 4);
        if (questionsByDifficulty[difficultyKey]) {
          questionsByDifficulty[difficultyKey].push(q);
        }
      });
      console.log('GenerateTestUseCase: Candidates by difficulty:',
        `D1: ${questionsByDifficulty[1].length}, D2: ${questionsByDifficulty[2].length}, D3: ${questionsByDifficulty[3].length}, D4: ${questionsByDifficulty[4].length}`);

      // Aplicar priorización por categoría si tenemos subcategorías priorizadas
      if (prioritizedSubcategories.length > 0) {
        console.log('--- Starting Category-Priority-Based Selection ---');
        const questionDistribution = this.calculateQuestionDistribution(prioritizedSubcategories, TOTAL_QUESTIONS_PER_TEST);
        selectedQuestions = this.prioritizeQuestionsByCategory(availableCandidates, questionDistribution);
        console.log(`--- After Category-Priority Selection: ${selectedQuestions.length} questions selected ---`);
      } else {
        console.log('--- Starting Primary Difficulty-Based Selection --- ');
        for (const diffLevel of [1, 2, 3, 4] as const) {
          if (selectedQuestions.length >= TOTAL_QUESTIONS_PER_TEST) break;
          const targetCount = difficultyDistributionTargets[diffLevel];
          const currentCountForLevel = selectedQuestions.filter(q => q.mapped_difficulty === diffLevel).length;
          let needed = targetCount - currentCountForLevel;
          console.log(`Difficulty ${diffLevel}: Target ${targetCount}, Have ${currentCountForLevel}, Need ${needed}. Available: ${questionsByDifficulty[diffLevel]?.length || 0}`);

          while (needed > 0 && questionsByDifficulty[diffLevel]?.length > 0) {
            if (selectedQuestions.length >= TOTAL_QUESTIONS_PER_TEST) break;
            const questionToAdd = questionsByDifficulty[diffLevel].pop();
            if (questionToAdd) {
              selectedQuestions.push(questionToAdd);
              console.log(`   Added QID ${questionToAdd.id} (D${diffLevel}). Total selected: ${selectedQuestions.length}`);
              needed--;
            }
          }
        }
        console.log(`--- After Primary Selection: ${selectedQuestions.length} questions selected ---`);

        if (selectedQuestions.length < TOTAL_QUESTIONS_PER_TEST) {
          console.log('--- Starting Fallback Filling --- ');
          const difficultyOrderForFallback: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
          for (const diffLevel of difficultyOrderForFallback) {
            if (selectedQuestions.length >= TOTAL_QUESTIONS_PER_TEST) break;
            console.log(`Fallback fill for D${diffLevel}: Need ${TOTAL_QUESTIONS_PER_TEST - selectedQuestions.length}. Available in D${diffLevel}: ${questionsByDifficulty[diffLevel]?.length || 0}`);
            while (questionsByDifficulty[diffLevel]?.length > 0 && selectedQuestions.length < TOTAL_QUESTIONS_PER_TEST) {
              const questionToAdd = questionsByDifficulty[diffLevel].pop();
              if (questionToAdd && !selectedQuestions.some(sq => sq.id === questionToAdd.id)) { // Ensure unique if somehow missed
                selectedQuestions.push(questionToAdd);
                console.log(`   Fallback Added QID ${questionToAdd.id} (D${diffLevel}). Total selected: ${selectedQuestions.length}`);
              }
            }
          }
          console.log(`--- After Fallback Filling: ${selectedQuestions.length} questions selected ---`);
        }
      }

      if (attempt === 1 && selectedQuestions.length < TOTAL_QUESTIONS_PER_TEST && answeredQuestionIds.size > 0 && !attemptPreviouslyAnswered) {
        attemptPreviouslyAnswered = true;
        console.log(`GenerateTestUseCase: First attempt (unique) yielded ${selectedQuestions.length} questions. Will retry, allowing previously answered questions.`);
      } else if (selectedQuestions.length >= TOTAL_QUESTIONS_PER_TEST) {
        console.log('GenerateTestUseCase: Target question count met.');
        break;
      }
    }

    console.log(`--- Finalizing Selection ---`);
    if (selectedQuestions.length === 0) {
      console.error('GenerateTestUseCase: Insufficient questions. No questions selected after all attempts.');
      throw new Error('GenerateTestUseCase: Insufficient questions available to generate any test, even after all fallbacks.');
    }

    if (selectedQuestions.length > TOTAL_QUESTIONS_PER_TEST) {
      console.warn(`GenerateTestUseCase: Selected ${selectedQuestions.length} questions, more than target. Slicing to ${TOTAL_QUESTIONS_PER_TEST}.`);
      selectedQuestions = selectedQuestions.slice(0, TOTAL_QUESTIONS_PER_TEST);
    }
    if (selectedQuestions.length < TOTAL_QUESTIONS_PER_TEST) {
      console.warn(`GenerateTestUseCase: Selected only ${selectedQuestions.length} questions, less than target ${TOTAL_QUESTIONS_PER_TEST}. Proceeding with available.`);
    }

    shuffleArray(selectedQuestions);
    console.log(`GenerateTestUseCase: Final selected questions count: ${selectedQuestions.length}. IDs: ${selectedQuestions.map(q => q.id).join(', ')}`);

    const testExecution = await this.testRepository.createTestExecution(null, userId);
    const testExecutionId = testExecution.id;

    const answerInserts = selectedQuestions.map(q => ({
      test_execution_id: testExecutionId,
      question_id: q.id,
      selected_answer: null,
      is_correct: null,
      is_marked: false,
      observations: null,
    }));

    await this.testRepository.saveTestQuestions(testExecutionId, selectedQuestions);

    console.log(`GenerateTestUseCase: Successfully created test execution ID: ${testExecutionId} with ${selectedQuestions.length} questions.`);
    console.log(`--- GenerateTestUseCase: Test Generation Ended ---`);
    return testExecutionId;
  }
} 