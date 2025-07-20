import {
  CategoryRepository,
  CategoryRepositoryImpl,
} from "@/domain/repositories/CategoryRepository"
import {
  TestRepository,
  TestRepositoryImpl,
} from "@/domain/repositories/TestRepository"
import {
  UserCategoryPerformanceRepository,
  UserCategoryPerformanceRepositoryImpl,
} from "@/domain/repositories/UserCategoryPerformanceRepository"
import { Category } from "@/domain/entities/Category"
import { Question } from "@/domain/entities/Question"
import { Test } from "@/domain/entities/Test"
import { TestExecution, TestExecutionAnswer } from "@/domain/entities/TestExecution"
import {
  AlertTriangle,
  Brain,
  Cloud,
  FileQuestion,
  Gauge,
  LucideIcon,
  Navigation as NavigationIcon,
  Plane,
  Radio,
  Waypoints,
} from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

// --- Output Interface ---

// Represents the structure returned by the use case for each category
export interface UserCategoryPerformance {
  name: string
  slug: string // Will hold the category ID (string)
  iconName: string | null // Icon identifier
  questions: number // Total questions in the category
  completed: number // Questions answered by the user in completed tests for this category
  score: number // Average score across completed tests for this category (0-100)
  color: string | null // Tailwind gradient class
  minProgress: number // Minimum progress percentage required (0-100)
  confidence: number // User confidence level (1-5)

}

// Mapeos por defecto para iconos y colores de categorías
const categoryIconMap: Record<string, string> = {
  'meteorologia': 'Cloud',
  'performance': 'Gauge',
  'comunicaciones': 'Radio',
  'conocimiento-aeronave': 'Plane',
  'navegacion': 'NavigationIcon',
  'principios-vuelo': 'FileQuestion',
  'factores-humanos': 'Brain',
  'derecho-aereo': 'Waypoints',
  'procedimientos': 'AlertTriangle',
}

const categoryColorMap: Record<string, string> = {
  'meteorologia': 'from-sky-500 to-blue-500',
  'performance': 'from-green-500 to-emerald-500',
  'comunicaciones': 'from-purple-500 to-indigo-500',
  'conocimiento-aeronave': 'from-orange-500 to-red-500',
  'navegacion': 'from-pink-500 to-rose-500',
  'principios-vuelo': 'from-yellow-500 to-amber-500',
  'factores-humanos': 'from-teal-500 to-cyan-500',
  'derecho-aereo': 'from-violet-500 to-purple-500',
  'procedimientos': 'from-fuchsia-500 to-pink-500',
}

// --- Use Case Implementation ---

export class GetUserCategoryPerformanceUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private testRepository: TestRepository,
    private userCategoryPerformanceRepository: UserCategoryPerformanceRepository
  ) { }

  static create(supabase: SupabaseClient): GetUserCategoryPerformanceUseCase {
    const categoryRepository = new CategoryRepositoryImpl(supabase)
    const testRepository = new TestRepositoryImpl(supabase)
    const userCategoryPerformanceRepository = new UserCategoryPerformanceRepositoryImpl(supabase)
    return new GetUserCategoryPerformanceUseCase(
      categoryRepository,
      testRepository,
      userCategoryPerformanceRepository
    )
  }

  async execute(userId: string): Promise<UserCategoryPerformance[]> {
    try {

      // 1. Fetch initial data
      const [categories, performanceData, allQuestions] = await Promise.all([
        this.categoryRepository.getRootCategories(),
        this.userCategoryPerformanceRepository.getUserCategoryPerformances(userId),
        this.testRepository.getQuestions(),
      ])

      if (!categories || categories.length === 0) return []

      // 2. Process and aggregate data
      const performanceMap = new Map<string, any>(
        performanceData.map((perf) => [perf.categoryId, perf])
      )

      const performanceOutput = categories.map((category: Category) => {
        // Count total questions in this category
        const totalQuestionsInCategory = allQuestions.filter(
          (q: Question) => q.categoryId === category.id
        ).length

        // Get performance data for this category if it exists
        const perf = performanceMap.get(category.id)

        // Usar los mapeos por defecto si los valores son nulos o vacíos
        const iconName = category.iconName || categoryIconMap[category.id] || 'FileQuestion'
        const color = (category.color && category.color.length > 0)
          ? category.color
          : categoryColorMap[category.id] || 'from-blue-800 to-indigo-900'

        // Usar valores reales de la base de datos
        const minimumProgress = perf ? perf.minimumProgress : 0
        const confidence = perf ? perf.confidence : 0
        const currentProgress = totalQuestionsInCategory > 0
          ? Math.round((perf ? perf.questionsCompleted : 0) / totalQuestionsInCategory * 100)
          : 0

        const result = {
          name: category.name,
          slug: category.id,
          iconName,
          questions: totalQuestionsInCategory,
          completed: perf ? perf.questionsCompleted : 0,
          score: perf ? perf.successRate : 0,
          color,
          minProgress: minimumProgress,
          confidence,

        }



        return result
      })

      return performanceOutput
    } catch (error) {
      console.error("Error in GetUserCategoryPerformanceUseCase:", error)
      return []
    }
  }
} 