import { SupabaseClient } from '@supabase/supabase-js'

export class CreateTestUseCase {
  async execute(categoryId?: string): Promise<number> {
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          durationSeconds: 3600 // 60 minutos
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating test');
      }

      const data = await response.json();
      
      // El endpoint siempre devuelve testExecutionId
      return data.testExecutionId;
    } catch (error) {
      console.error('Error in CreateTestUseCase:', error);
      throw error;
    }
  }

  static create(supabase: SupabaseClient): CreateTestUseCase {
    return new CreateTestUseCase();
  }
} 