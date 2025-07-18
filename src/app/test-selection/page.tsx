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
import { CreateTestUseCase } from "@/domain/use-cases/CreateTestUseCase"
import { useAuth } from "@/context/auth-context"
import { useAuthModal } from "@/context/AuthModalContext"

import PreparingTestScreen from "./_components/PreparingTestScreen"

export default function TestSelectionPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const [isPreparingTest, setIsPreparingTest] = useState(false)
  const [preparingTestError, setPreparingTestError] = useState<string | null>(
    null,
  )
  const [preparingTestType, setPreparingTestType] = useState<
    "generic" | "category"
  >("generic")
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("")
  const [pendingTestAction, setPendingTestAction] = useState<{
    categoryId?: string
  } | null>(null)

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

  const executeTestCreation = async (categoryId?: string) => {
    setIsPreparingTest(true)
    setPreparingTestError(null)

    if (categoryId) {
      setPreparingTestType("category")
      const category = categories.find((cat) => cat.id === categoryId)
      setSelectedCategoryName(category?.name || "")
    } else {
      setPreparingTestType("generic")
      setSelectedCategoryName("")
    }

    try {
      console.log(
        `Iniciando creación de test ${categoryId ? `para categoría ${categoryId}` : "genérico"}...`,
      )

      const timer = new Promise((resolve) => setTimeout(resolve, 3000))

      const testCreation = async () => {
        const supabase = createClient()
        const createTestUseCase = CreateTestUseCase.create(supabase)
        const testExecutionId = await createTestUseCase.execute(categoryId)

        console.log(
          `Test creado exitosamente con ID de ejecución: ${testExecutionId}`,
        )
        return testExecutionId
      }

      const [testExecutionId] = await Promise.all([testCreation(), timer])

      // No llamamos setIsPreparingTest(false) aquí para evitar mostrar test-selection
      // antes del redirect. El componente se desmontará con la navegación.
      router.push(`/test/${testExecutionId}`)
    } catch (error: any) {
      console.error("Error starting test:", error)
      setPreparingTestError(
        error.message ||
          "Ocurrió un error al preparar el test. Por favor, inténtalo de nuevo.",
      )
    }
  }

  const handleStartTest = async (categoryId?: string) => {
    // Check if user is authenticated
    if (!user) {
      // Store the pending action and open login modal
      setPendingTestAction({ categoryId })
      openLogin(() => {
        // This callback will be executed after successful login
        // We need to use the current categoryId, not from state
        executeTestCreation(categoryId)
        setPendingTestAction(null)
      })
      return
    }

    // User is authenticated, proceed with test creation
    await executeTestCreation(categoryId)
  }

  const handleRetryTest = () => {
    setPreparingTestError(null)

    if (preparingTestType === "category" && selectedCategoryName) {
      const category = categories.find(
        (cat) => cat.name === selectedCategoryName,
      )
      executeTestCreation(category?.id)
    } else {
      executeTestCreation()
    }
  }

  if (isPreparingTest) {
    return (
      <PreparingTestScreen
        onRetry={handleRetryTest}
        testType={preparingTestType}
        categoryName={selectedCategoryName}
        errorMessage={preparingTestError}
      />
    )
  }

  return (
    <div className="min-h-screen bg-blue-purple">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Selección de Test
          </h1>
          <p className="text-xl text-blue-200 mb-10">
            Elige el tipo de test que deseas realizar para poner a prueba tus
            conocimientos
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
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
                  <Card className="bg-card-custom text-white border-0 flex flex-col h-44 bg-gradient-to-br from-blue-800/40 to-indigo-800/40">
                    <CardHeader className="flex-1 py-4 px-4 flex flex-col items-center justify-center text-center">
                      <div className="mb-3">
                        <CategoryIcon
                          iconName={category.iconName}
                          color={category.color}
                          className="h-12 w-12"
                        />
                      </div>
                      <CardTitle className="text-base h-10 flex items-center justify-center">
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
            <div className="flex items-center mb-6">
              <BarChart3 className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Test Especiales</h2>
            </div>
            <p className="text-blue-200 mb-8 text-lg">
              Hemos seleccionado unos tests hechos a medida para profundizar
              sobre temas concretos del examen ULM. Si te sientes valiente y
              quieres poner a prueba tus conocimientos especializados, ¡estos
              desafíos son para ti!
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Test Meteorología: Frentes */}
              <Card className="bg-white/5 text-white border-0 hover:bg-white/10 transition-all duration-300 cursor-pointer group overflow-hidden">
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
                  <CardTitle className="text-lg font-bold group-hover:text-blue-200 transition-colors mb-3">
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
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      onClick={() => {
                        // TODO: Implementar lógica para test especial de meteorología
                        console.log("Test especial: Meteorología - Frentes")
                      }}
                    >
                      Comenzar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Test Luces en Tierra y Aire */}
              <Card className="bg-white/5 text-white border-0 hover:bg-white/10 transition-all duration-300 cursor-pointer group overflow-hidden">
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
                  <CardTitle className="text-lg font-bold group-hover:text-blue-200 transition-colors mb-3">
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
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      onClick={() => {
                        // TODO: Implementar lógica para test especial de luces
                        console.log("Test especial: Luces en tierra y aire")
                      }}
                    >
                      Comenzar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Test Comunicaciones de Emergencia */}
              <Card className="bg-white/5 text-white border-0 hover:bg-white/10 transition-all duration-300 cursor-pointer group overflow-hidden">
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
                  <CardTitle className="text-lg font-bold group-hover:text-blue-200 transition-colors mb-3">
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
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      onClick={() => {
                        // TODO: Implementar lógica para test especial de comunicaciones
                        console.log(
                          "Test especial: Comunicaciones de emergencia",
                        )
                      }}
                    >
                      Comenzar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
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
