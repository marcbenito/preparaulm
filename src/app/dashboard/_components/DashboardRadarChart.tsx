"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import RadarChart from "@/components/ui/RadarChart"
import {
  GetUserCategoryPerformanceUseCase,
  UserCategoryPerformance,
} from "@/domain/use-cases/users/GetUserCategoriesPerformance"
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

        const getUserCategoryPerformanceUseCase =
          GetUserCategoryPerformanceUseCase.create(supabase)
        const categoryPerformance =
          await getUserCategoryPerformanceUseCase.execute(user.id)

        const radarData = categoryPerformance.map(
          (cat: UserCategoryPerformance) => ({
            subject: cat.name,
            score: cat.score,
            fullMark: 100,
          }),
        )

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
