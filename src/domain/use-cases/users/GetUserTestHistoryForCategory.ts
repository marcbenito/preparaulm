import {
  CategoryRepository,
  CategoryRepositoryImpl,
} from "@/domain/repositories/CategoryRepository"
import {
  TestRepository,
  TestRepositoryImpl,
} from "@/domain/repositories/TestRepository"
import { Category } from "@/domain/entities/Category"
import { Test } from "@/domain/entities/Test"
import { TestExecution } from "@/domain/entities/TestExecution"
import { createClient } from "@/utils/supabase/server"

// --- Input Interface ---
interface GetUserTestHistoryForCategoryParams {
  userId: string
  categorySlug: string // Category ID is used as slug
}

// --- Output Interfaces ---

// Represents a formatted item for the history table
interface FormattedHistoryItem {
  id: number // Execution ID
  date: Date
  score: number | null
  timeSpent: string
  questions: number
  correct: number
  status: string
}

// Represents aggregated stats for the category
interface CategoryStats {
  averageScore: number
  bestScore: number
  totalTests: number
  averageTime: string
}

// Represents a data point for the progress chart
interface ProgressChartDataPoint {
  date: string // Formatted date for chart axis
  score: number | null
}

interface SubcategoryPerformanceItem {
  id: string
  name: string
  description: string | null
  score: number
  questionsAnswered: number
}

// Combined result returned by the use case
export interface UserCategoryHistoryResult {
  categoryName: string
  historyItems: FormattedHistoryItem[]
  stats: CategoryStats
  progressChartData: ProgressChartDataPoint[]
  subcategories: SubcategoryPerformanceItem[]
}

// --- Helper Functions ---

const formatTimeSpent = (createdAt: Date, completedAt: Date | null): string => {
  if (!completedAt) return "-"
  const diffInSeconds = Math.max(
    0,
    Math.floor((completedAt.getTime() - createdAt.getTime()) / 1000)
  )
  const minutes = Math.floor(diffInSeconds / 60)
  const seconds = diffInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Add back the parseTime helper function
const parseTime = (timeString: string): number => {
  if (timeString === "-") return 0
  const [minutes, seconds] = timeString.split(":").map(Number)
  return minutes * 60 + seconds
}

const formatDateForChart = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// --- Use Case Implementation ---

export class GetUserTestHistoryForCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private testRepository: TestRepository
  ) {}

  static async create() {
    const supabase = await createClient()
    const categoryRepository = new CategoryRepositoryImpl(supabase)
    const testRepository = new TestRepositoryImpl(supabase)
    return new GetUserTestHistoryForCategoryUseCase(
      categoryRepository,
      testRepository
    )
  }

  async execute({
    userId,
    categorySlug,
  }: GetUserTestHistoryForCategoryParams): Promise<UserCategoryHistoryResult | null> {
    try {
      // 1. Find the target category and its name using the repository method
      const targetCategory = await this.categoryRepository.getCategoryById(categorySlug);

      if (!targetCategory) {
        console.warn(`Category not found for id: ${categorySlug}`)
        return null
      }
      const targetCategoryId = targetCategory.id
      const categoryName = targetCategory.name

      // 2. Fetch all executions for the user
      const allExecutions = await this.testRepository.getTestExecutionsByUserId(userId)

      // 3. Fetch associated Tests to get category IDs
      const validTestIds = allExecutions
        .map((exec) => exec.testId)
        .filter((id): id is number => id !== null)
      
      const uniqueTestIds = validTestIds.filter((id, index) => validTestIds.indexOf(id) === index)
      
      const tests = await this.testRepository.getTestsByIds(uniqueTestIds)
      const testIdToCategoryMap = new Map<number, string | null>(
        tests.map((test: Test) => [test.id, test.categoryId])
      )

      // 4. Filter executions for the target category
      const categoryExecutions = allExecutions.filter((exec: TestExecution) => {
        const categoryIdForTest = testIdToCategoryMap.get(exec.testId)
        return (
          categoryIdForTest !== undefined && categoryIdForTest === targetCategoryId
        )
      })

      // 5. Map executions to the intermediate format for calculations
      const historyItems: FormattedHistoryItem[] = categoryExecutions.map(
        (exec: TestExecution): FormattedHistoryItem => {
          const totalQuestions = exec.answers?.length || 0
          const correctAnswers =
            exec.answers?.filter((a) => a.isCorrect === true).length || 0
          // Determine status based on completedAt or entity property if added
          const status =
            (exec as any).status ?? (exec.completedAt ? "completed" : "inprogress")

          return {
            id: exec.id,
            date: exec.completedAt || exec.createdAt, // Prefer completedAt for sorting/charting
            score: exec.score,
            timeSpent: formatTimeSpent(exec.createdAt, exec.completedAt),
            questions: totalQuestions,
            correct: correctAnswers,
            status: status,
          }
        }
      ).sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort before calculating stats

      // 6. Calculate Stats
      const completedTests = historyItems.filter(
        (item) => item.status === "completed" && item.score !== null
      )
      const totalTests = historyItems.length
      const bestScore =
        completedTests.length > 0
          ? Math.max(...completedTests.map((test) => test.score!))
          : 0
      const averageScore =
        completedTests.length > 0
          ? completedTests.reduce((acc, test) => acc + test.score!, 0) /
            completedTests.length
          : 0

      // Calculate average time
      const validTimes = historyItems.map(item => item.timeSpent).filter(ts => ts !== "-")
      const totalSeconds = validTimes.reduce((acc, time) => acc + parseTime(time), 0)
      const avgSecondsTotal = validTimes.length > 0 ? totalSeconds / validTimes.length : 0
      const avgMinutes = Math.floor(avgSecondsTotal / 60)
      const avgSeconds = Math.floor(avgSecondsTotal % 60)
      const averageTime = `${avgMinutes}:${avgSeconds.toString().padStart(2, "0")}`

      const stats: CategoryStats = {
        averageScore: parseFloat(averageScore.toFixed(1)), // Ensure single decimal place
        bestScore: bestScore,
        totalTests: totalTests,
        averageTime: averageTime,
      }

      // 7. Prepare data for the progress chart
      const progressChartData: ProgressChartDataPoint[] = completedTests
        .map((item) => ({
          date: formatDateForChart(item.date),
          score: item.score,
        }))
        .reverse() // Show oldest first

      // Fetch subcategories directly using the new repository method
      const subcategories = await this.categoryRepository.getCategoriesByParentId(targetCategoryId)
      const subcategoryPerformance = subcategories.map((subcat: Category) => {
        const executionsForSubcat = allExecutions.filter(
          (exec) => testIdToCategoryMap.get(exec.testId) === subcat.id
        )
        const completedForSubcat = executionsForSubcat.filter(
          (exec) => exec.completedAt && exec.score !== null
        )
        const avgScore =
          completedForSubcat.length > 0
            ? completedForSubcat.reduce(
                (sum, exec) => sum + (exec.score ?? 0),
                0
              ) / completedForSubcat.length
            : 0
        const formattedAvgScore = parseFloat(avgScore.toFixed(1))
        const questionsAnswered = executionsForSubcat.reduce(
          (sum, exec) => sum + (exec.answers?.length || 0),
          0
        )
        return {
          id: subcat.id,
          name: subcat.name,
          description: subcat.description,
          score: formattedAvgScore,
          questionsAnswered,
        }
      })

      // 8. Return combined result
      return {
        categoryName,
        historyItems,
        stats,
        progressChartData,
        subcategories: subcategoryPerformance,
      }
    } catch (error) {
      console.error("Error in GetUserTestHistoryForCategoryUseCase:", error)
      return null
    }
  }
} 