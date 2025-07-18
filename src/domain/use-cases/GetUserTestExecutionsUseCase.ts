import { TestExecution } from '@/domain/entities/TestExecution';
import { TestRepositoryImpl } from '@/domain/repositories/TestRepository';
import { SupabaseClient } from '@supabase/supabase-js';

export class GetUserTestExecutionsUseCase {
  constructor(private testRepository: TestRepositoryImpl) {}

  async execute(params: { userId: string, limit?: number }): Promise<TestExecution[]> {
    return this.testRepository.getTestExecutionsByUserId(params.userId);
  }

  static create(supabase: SupabaseClient): GetUserTestExecutionsUseCase {
    const repository = new TestRepositoryImpl(supabase);
    return new GetUserTestExecutionsUseCase(repository);
  }
} 