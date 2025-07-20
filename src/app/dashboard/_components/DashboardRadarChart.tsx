"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import RadarChart from "@/components/ui/RadarChart"
import { GetUserCategoryPerformanceUseCase } from "@/domain/use-cases/GetUserCategoryPerformanceUseCase"
import { CategoryRepositoryImpl } from "@/domain/repositories/CategoryRepository"
import { createClient } from "@/utils/supabase/client"

// Define the shape of the data expected by the chart
interface RadarChartDataPoint {
  subject: string
  score: number
  fullMark: number
}

export default function DashboardRadarChart() {
  const [performanceData, setPerformanceData] = useState<RadarChartDataPoint[]>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          setError("Usuario no autenticado")
          return
        }

        // Usar el caso de uso simple
        const getUserCategoryPerformanceUseCase = GetUserCategoryPerformanceUseCase.create(supabase)
        const categoryRepository = new CategoryRepositoryImpl(supabase)

        // Obtener datos en paralelo
        const [performanceData, rootCategories] = await Promise.all([
          getUserCategoryPerformanceUseCase.execute(user.id),
          categoryRepository.getRootCategories()
        ])

        if (!rootCategories || rootCategories.length === 0) {
          setError("No se encontraron categorías")
          return
        }

        // Crear un mapa de rendimiento por categoryId
        const performanceMap = new Map(
          performanceData.map((perf) => [perf.categoryId, perf])
        )

        // Combinar datos y calcular scores
        const radarData = rootCategories.map((category) => {
          const perf = performanceMap.get(category.id)
          
          // Calcular el score usando datos sin ponderar
          let calculatedScore = 0
          if (perf && perf.questionsCompleted > 0 && perf.questionsSuccess >= 0) {
            // Usar preguntas sin ponderar: questionsSuccess / questionsCompleted
            calculatedScore = (perf.questionsSuccess / perf.questionsCompleted) * 100
            // Redondear a 1 decimal
            calculatedScore = Math.round(calculatedScore * 10) / 10
          }

          return {
            subject: category.name,
            score: calculatedScore,
            fullMark: 100,
          }
        })

        setPerformanceData(radarData)
      } catch (err) {
        console.error("Error fetching performance data:", err)
        setError("Error al cargar los datos de rendimiento")
      } finally {
        setLoading(false)
      }
    }

    fetchPerformanceData()
  }, [])

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-xl mt-8">
      <CardHeader>
        <CardTitle className="text-white">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white/80"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
          <RadarChart data={performanceData} />
        )}
      </CardContent>
    </Card>
  )
}
