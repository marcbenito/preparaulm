"use client"

import { useEffect, useState } from "react"
import { CategoryCard } from "./CategoryCard"
import { Category } from "./Types"
import { GetUserCategoryPerformanceUseCase } from "@/domain/use-cases/GetUserCategoryPerformanceUseCase"
import { CategoryRepositoryImpl } from "@/domain/repositories/CategoryRepository"
import { createClient } from "@/utils/supabase/client"

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

interface CategoryListProps {
  categories: Category[]
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
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

        // Combinar datos de categorías con rendimiento
        const combinedCategories = rootCategories.map((category) => {
          const perf = performanceMap.get(category.id)
          
          // Usar los mapeos por defecto si los valores son nulos o vacíos
          const iconName = category.iconName || categoryIconMap[category.id] || 'FileQuestion'
          const color = (category.color && category.color.length > 0)
            ? category.color
            : categoryColorMap[category.id] || 'from-blue-800 to-indigo-900'

          // Calcular el score usando datos sin ponderar
          let calculatedScore = 0
          if (perf && perf.questionsCompleted > 0 && perf.questionsSuccess >= 0) {
            // Usar preguntas sin ponderar: questionsSuccess / questionsCompleted
            calculatedScore = (perf.questionsSuccess / perf.questionsCompleted) * 100
            // Redondear a 1 decimal
            calculatedScore = Math.round(calculatedScore * 10) / 10
          }

          const result: Category = {
            name: category.name,
            slug: category.id,
            iconName,
            questions: category.totalQuestions || 0,
            completed: perf ? perf.questionsCompleted : 0,
            score: calculatedScore,
            color,
            minProgress: perf ? perf.minimumProgress : 0,
            confidence: perf ? perf.confidence : 0,
          }

          return result
        })

        setCategories(combinedCategories)
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Error al cargar las categorías")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Test Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/5 border-white/10 backdrop-blur-sm rounded-xl p-6 animate-pulse"
            >
              <div className="h-8 w-8 bg-white/20 rounded-lg mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Test Categories
        </h2>
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">
        Test Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </div>
  )
}
