import { Test } from '@/domain/entities/Test';
import { TestRepository, TestRepositoryImpl  } from '@/domain/repositories/TestRepository';
import { SupabaseClient } from '@supabase/supabase-js';

export interface GetTestsParams {
  page: number;
  limit: number;
}

export class GetTestsUseCase {
  constructor(private testRepository: TestRepository) {}

  async execute({ page, limit }: GetTestsParams): Promise<Test[]> {
    // Por ahora retornamos todos los tests ya que el repositorio no tiene paginación implementada
    // TODO: Implementar paginación en el repositorio
    return this.testRepository.getTests();
  }
  static create(supabase: SupabaseClient): GetTestsUseCase {
    const testRepository = new TestRepositoryImpl(supabase);
    return new GetTestsUseCase(testRepository);
  }
} 