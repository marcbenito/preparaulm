"use client"

import { useEffect, useState } from "react"
import { CategoryCard } from "./CategoryCard"
import { Category } from "./Types"
import { GetUserCategoryPerformanceUseCase } from "@/domain/use-cases/users/GetUserCategoriesPerformance"
import { createClient } from "@/utils/supabase/client"

// interface Category {
//   name: string
//   slug: string
// }

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

        const getUserCategoryPerformanceUseCase =
          GetUserCategoryPerformanceUseCase.create(supabase)
        const categoryPerformance =
          await getUserCategoryPerformanceUseCase.execute(user.id)

        setCategories(categoryPerformance)
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
