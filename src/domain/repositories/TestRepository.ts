import { Question } from '@/domain/entities/Question';
import { Test, TestQuestion } from '@/domain/entities/Test';
import { TestExecution, TestExecutionAnswer } from '@/domain/entities/TestExecution';

interface QuestionFromDB {
  id: number;
  category_id: string;
  text: string;
  options: any;
  correct_answer: string;
  explanation?: string | null;
  difficulty: number;
}

interface SelectedQuestionInternal extends QuestionFromDB {
  parsed_options: Array<{key: string; value: string}>;
  mapped_difficulty: 1 | 2 | 3 | 4;
}

export interface TestRepository {
  getQuestions(categoryId?: string): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question>;
  getQuestionsByIds(questionIds: number[]): Promise<Question[]>;
  createTest(categoryId: string | null, durationSeconds: number): Promise<Test>;
  getTestById(id: number): Promise<Test>;
  getTests(): Promise<Test[]>;
  getTestExecutionsByUserId(userId: string): Promise<TestExecution[]>;
  getTestsByIds(testIds: number[]): Promise<Test[]>;
  addQuestionsToTest(testId: number, questionIds: number[]): Promise<void>;
  createTestExecution(testId: number | null, userId: string, categoryId?: string): Promise<TestExecution>;
  getTestExecution(id: number): Promise<TestExecution>;
  saveTestExecutionAnswer(answer: TestExecutionAnswer): Promise<TestExecutionAnswer>;
  updateTestExecutionAnswer(id: number, updates: Partial<TestExecutionAnswer>): Promise<TestExecutionAnswer>;
  completeTestExecution(id: number, score: number): Promise<TestExecution>;
  getUserAnsweredQuestionIds(userId: string): Promise<Set<number>>;
  getCandidateQuestions(categoryIds: string[], excludeQuestionIds: Set<number>, includeAnswered: boolean): Promise<QuestionFromDB[]>;
  saveTestQuestions(testExecutionId: number, questions: SelectedQuestionInternal[]): Promise<void>;
}

export class TestRepositoryImpl implements TestRepository {
  constructor(private supabase: any) {}

  // Question methods
  async getQuestions(categoryId?: string): Promise<Question[]> {
    let query = this.supabase.from('questions').select('*');
    
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data.map(Question.fromDB);
  }

  async getQuestionById(id: number): Promise<Question> {
    const { data, error } = await this.supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return Question.fromDB(data);
  }

  async getQuestionsByIds(questionIds: number[]): Promise<Question[]> {
    if (!questionIds || questionIds.length === 0) {
      return [];
    }
    const { data, error } = await this.supabase
      .from('questions')
      .select('*')
      .in('id', questionIds);
    
    if (error) throw error;
    return data.map(Question.fromDB);
  }

  // Test methods
  async createTest(categoryId: string | null, durationSeconds: number): Promise<Test> {
    const { data, error } = await this.supabase
      .from('tests')
      .insert({
        category_id: categoryId,
        duration_seconds: durationSeconds
      })
      .select()
      .single();

    if (error) throw error;
    return Test.fromDB(data);
  }

  async getTestById(id: number): Promise<Test> {
    const { data: testData, error: testError } = await this.supabase
      .from('tests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (testError) throw testError;

    const { data: questionsData, error: questionsError } = await this.supabase
      .from('test_questions')
      .select('*')
      .eq('test_id', id);
    
    if (questionsError) throw questionsError;

    const test = Test.fromDB(testData);
    test.questions = questionsData.map(TestQuestion.fromDB);
    return test;
  }

  async getTests(): Promise<Test[]> {
    const { data, error } = await this.supabase
      .from('tests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data.map(Test.fromDB);
  }

  async getTestsByIds(testIds: number[]): Promise<Test[]> {
    if (!testIds || testIds.length === 0) {
      return [];
    }
    const { data, error } = await this.supabase
      .from('tests')
      .select('*')
      .in('id', testIds);
    
    if (error) throw error;
    return data.map(Test.fromDB);
  }

  async addQuestionsToTest(testId: number, questionIds: number[]): Promise<void> {
    const testQuestions = questionIds.map((questionId, index) => ({
      test_id: testId,
      question_id: questionId,
      order_num: index + 1
    }));

    const { error } = await this.supabase
      .from('test_questions')
      .insert(testQuestions);
    
    if (error) throw error;
  }

  // Test Execution methods
  async createTestExecution(testId: number | null, userId: string, categoryId?: string): Promise<TestExecution> {
    const { data, error } = await this.supabase
      .from('test_executions')
      .insert({
        test_id: testId,
        user_id: userId,
        category_id: categoryId,
        created_at: new Date().toISOString(),
        completed_at: null,
        score: null
      })
      .select()
      .single();

    if (error) throw error;
    return TestExecution.fromDB(data);
  }

  async getTestExecution(id: number): Promise<TestExecution> {
    const { data: executionData, error: executionError } = await this.supabase
      .from('test_executions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (executionError) throw executionError;

    const { data: answersData, error: answersError } = await this.supabase
      .from('test_execution_answers')
      .select('*, questions(category_id,difficulty) ')
      .eq('test_execution_id', id);

    if (answersError) throw answersError;




    const execution = TestExecution.fromDB(executionData);
    execution.answers = answersData.map(TestExecutionAnswer.fromDB);
    return execution;
  }

  async saveTestExecutionAnswer(answer: TestExecutionAnswer): Promise<TestExecutionAnswer> {
    const { data, error } = await this.supabase
      .from('test_execution_answers')
      .upsert(answer.toDB())
      .select()
      .single();

    if (error) throw error;
    return TestExecutionAnswer.fromDB(data);
  }

  async updateTestExecutionAnswer(id: number, updates: Partial<TestExecutionAnswer>): Promise<TestExecutionAnswer> {
    const dbUpdates: any = {}
    
    if (updates.selectedAnswer !== undefined) {
      dbUpdates.selected_answer = updates.selectedAnswer
    }
    if (updates.isCorrect !== undefined) {
      dbUpdates.is_correct = updates.isCorrect
    }
    if (updates.observations !== undefined) {
      dbUpdates.observations = updates.observations
    }
    if (updates.isMarked !== undefined) {
      dbUpdates.is_marked = updates.isMarked
    }

    const { data, error } = await this.supabase
      .from('test_execution_answers')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return TestExecutionAnswer.fromDB(data);
  }

  async completeTestExecution(id: number, score: number): Promise<TestExecution> {
    const { data, error } = await this.supabase
      .from('test_executions')
      .update({
        completed_at: new Date().toISOString(),
        score
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return TestExecution.fromDB(data);
  }

  async getTestExecutionsByUserId(userId: string): Promise<TestExecution[]> {
    // Usamos JOIN para obtener las ejecuciones y sus respuestas en una sola consulta
    const { data, error } = await this.supabase
      .from('test_executions')
      .select(`
        *,
        test_execution_answers(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;

    // Procesamos los resultados para transformarlos en objetos TestExecution
    const executions = data.map((executionData: any) => {
      const execution = TestExecution.fromDB(executionData);
      // Si hay respuestas, las convertimos a objetos TestExecutionAnswer
      execution.answers = executionData.test_execution_answers 
        ? executionData.test_execution_answers.map(TestExecutionAnswer.fromDB)
        : [];
      return execution;
    });

    return executions;
  }

  async getUserAnsweredQuestionIds(userId: string): Promise<Set<number>> {
    const { data, error } = await this.supabase
      .from('test_execution_answers')
      .select('question_id, test_executions!inner(user_id)')
      .eq('test_executions.user_id', userId);
    if (error) throw error;
    return new Set(data.map((r: { question_id: number }) => r.question_id));
  }

  async getCandidateQuestions(categoryIds: string[], excludeQuestionIds: Set<number>, includeAnswered: boolean): Promise<QuestionFromDB[]> {
    let query = this.supabase.from('questions').select('id, category_id, text, options, correct_answer, explanation, difficulty');
    if (categoryIds.length > 0) {
      query = query.in('category_id', categoryIds);
    }
    if (!includeAnswered && excludeQuestionIds.size > 0) {
      query = query.not('id', 'in', `(${Array.from(excludeQuestionIds).join(',')})`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async saveTestQuestions(testExecutionId: number, questions: SelectedQuestionInternal[]): Promise<void> {
    const inserts = questions.map(q => ({
      test_execution_id: testExecutionId,
      question_id: q.id,
      selected_answer: null,
      is_correct: null,
      is_marked: false,
      observations: null
    }));
    const { error } = await this.supabase.from('test_execution_answers').insert(inserts);
    if (error) throw error;
  }
} 