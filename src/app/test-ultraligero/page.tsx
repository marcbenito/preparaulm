"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import {
  Trophy,
  BookOpen,
  Clock,
  LockKeyhole,
  ArrowRight,
  AlertCircle,
  Loader2,
  BarChart3,
  Sun,
  Timer,
} from "@/components/ui/icons"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { CategoryIcon } from "@/components/ui/CategoryIcon"

import { Category } from "@/domain/entities/Category"

import { createClient } from "@/utils/supabase/client"
import { GetMainCategoriesUseCase } from "@/domain/use-cases/GetMainCategoriesUseCase"

export default function TestSelectionPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  useEffect(() => {
    setIsLoadingCategories(true)
    loadCategories().finally(() => setIsLoadingCategories(false))
  }, [])

  const loadCategories = async () => {
    try {
      const supabase = createClient()
      const getMainCategoriesUseCase = GetMainCategoriesUseCase.create(supabase)
      const mainCategories = await getMainCategoriesUseCase.execute()
      setCategories(mainCategories)
    } catch (error) {
      console.error("Error cargando categorías:", error)
    }
  }



  const handleStartTest = (categoryId?: string) => {
    if (categoryId) {
      router.push(`/preparacion-test/${categoryId}`)
    } else {
      router.push('/preparacion-test/generic')
    }
  }



  return (
    <div className="min-h-screen bg-blue-purple">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tests de ultraligero
          </h1>
          <p className="text-xl text-blue-200 mb-10">
            Elige el tipo de test:
          </p>

          <Card className="bg-white/5 text-white mb-12 border-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className=" p-8">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-7 w-7 text-blue-400 mr-3" />
                  <h2 className="text-2xl font-bold">
                    Test Basado en Conocimiento
                  </h2>
                </div>
                <p className="text-blue-200 mb-6">
                  Este test es autogenerado en base a tu conocimiento actual,
                  tus tests anteriores realizados y tu rendimiento previo.
                  Nuestra IA selecciona las 10 preguntas más relevantes para tu
                  nivel de preparación, optimizando tu estudio de forma
                  personalizada.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-blue-200">
                      10 preguntas personalizadas en base a tus últimas
                      respuestas
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-blue-200">
                      Adaptado a tu progreso
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                    onClick={() => handleStartTest()}
                    disabled={isLoading}
                  >
                    Comenzar Test Personalizado
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link href="/como-funciona">
                    <Button variant="outline" className="w-full sm:w-auto">
                      ¿Cómo funciona?
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">
            Selecciona una categoría específica
          </h2>

          {isLoadingCategories ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <span className="ml-3 text-white text-lg">
                Cargando categorías...
              </span>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-blue-200">
              No hay categorías disponibles.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => !isLoading && handleStartTest(category.id)}
                  className={`group block h-full rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (!isLoading) handleStartTest(category.id)
                    }
                  }}
                >
                  <Card className="bg-card-custom text-white border-0 flex flex-col md:h-32 lg:h-36 bg-gradient-to-br from-blue-800/40 to-indigo-800/40">
                    <CardHeader className="flex-1 py-3 px-4 flex flex-row md:flex-col items-center md:justify-center text-center md:text-center gap-4 md:gap-2">
                      <div className="flex-shrink-0">
                        <CategoryIcon
                          iconName={category.iconName}
                          color={category.color}
                          className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
                        />
                      </div>
                      <CardTitle className="text-base flex-1 md:flex-none md:h-8 lg:h-10 flex items-center justify-start md:justify-center text-left md:text-center">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Test Especiales Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Tests específicos</h2>
              </div>
              <Link href="/test-especificos">
                <Button variant="outline" size="sm">
                  Ver todos los tests
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Test Meteorología: Frentes */}
              <Card className="bg-white/5 text-white border-0 overflow-hidden">
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800&h=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  >
                    Nivel Avanzado
                  </Badge>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold mb-3">
                    Meteorología: Frentes
                  </CardTitle>
                  <p className="text-blue-200 text-sm mb-4">
                    Test especializado en frentes cálidos y fríos. Profundiza en
                    las características, identificación y efectos meteorológicos
                    de los sistemas frontales en la aviación.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-300 text-sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>15 preguntas</span>
                    </div>
                    <Link href="/test-especificos/meteorologia-frentes">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        Ver más
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>

              {/* Test Luces en Tierra y Aire */}
              <Card className="bg-white/5 text-white border-0 overflow-hidden">
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1548309667-15c4a4f36b0e?auto=format&fit=crop&q=80&w=800&h=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    Nivel Avanzado
                  </Badge>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold mb-3">
                    Luces en Tierra y Aire
                  </CardTitle>
                  <p className="text-blue-200 text-sm mb-4">
                    Domina las luces de navegación, señales luminosas de
                    aeropuertos, balizas y sistemas de iluminación cruciales
                    para la seguridad aérea.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-300 text-sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>12 preguntas</span>
                    </div>
                    <Link href="/test-especificos/luces-en-tierra-y-aire">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        Ver más
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>

              {/* Test Comunicaciones de Emergencia */}
              <Card className="bg-white/5 text-white border-0 overflow-hidden">
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?auto=format&fit=crop&q=80&w=800&h=400')",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-red-500/20 text-red-300 border border-red-500/30"
                  >
                    Nivel Experto
                  </Badge>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-lg font-bold mb-3">
                    Comunicaciones de Emergencia
                  </CardTitle>
                  <p className="text-blue-200 text-sm mb-4">
                    Procedimientos de radio en situaciones de emergencia,
                    señales de socorro, y comunicaciones críticas para la
                    seguridad del vuelo.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-300 text-sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>18 preguntas</span>
                    </div>
                    <Link href="/test-especificos/comunicaciones-emergencia">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        Ver más
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
