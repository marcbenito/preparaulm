import { SupabaseClient } from '@supabase/supabase-js'

export interface UserTestScoreResult {
  averageScore: number
  totalCompletedTests: number
}

export class UserTestScoreService {
  constructor(private supabase: SupabaseClient) {}

  async getUserAverageScore(
    userId: string, 
    excludeTestExecutionId?: number
  ): Promise<UserTestScoreResult> {
    try {
      let query = this.supabase
        .from('test_executions')
        .select('score')
        .eq('user_id', userId)
        .not('completed_at', 'is', null)
        .not('score', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(10)

      if (excludeTestExecutionId) {
        query = query.neq('id', excludeTestExecutionId)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching user test scores:', error)
        return { averageScore: 0, totalCompletedTests: 0 }
      }

      if (!data || data.length === 0) {
        return { averageScore: 0, totalCompletedTests: 0 }
      }

      const scores = data.map(execution => execution.score).filter(score => score !== null)
      const averageScore = scores.length > 0 
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
        : 0

      const totalCompletedTests = scores.length

      return {
        averageScore: Math.round(averageScore * 100) / 100,
        totalCompletedTests
      }
    } catch (error) {
      console.error('Unexpected error in getUserAverageScore:', error)
      return { averageScore: 0, totalCompletedTests: 0 }
    }
  }
} 