"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { CreateTestUseCase } from "@/domain/use-cases/CreateTestUseCase"
import { GetMainCategoriesUseCase } from "@/domain/use-cases/GetMainCategoriesUseCase"
import { useAuth } from "@/context/auth-context"
import { useAuthModal } from "@/context/AuthModalContext"
import PreparingTestScreen from "@/app/test-ultraligero/_components/PreparingTestScreen"
import { Category } from "@/domain/entities/Category"
import testsData from "@/app/test-especificos/tests-data.json"

interface PreparacionTestClientProps {
  slug: string
}

export default function PreparacionTestClient({ slug }: PreparacionTestClientProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { openLogin } = useAuthModal()
  const [categories, setCategories] = useState<Category[]>([])
  const [isPreparingTest, setIsPreparingTest] = useState(false)
  const [preparingTestError, setPreparingTestError] = useState<string | null>(null)
  const [testInfo, setTestInfo] = useState<{
    type: "generic" | "category" | "specific"
    name: string
    categoryId?: string
    testId?: string
  }>({ type: "generic", name: "" })

  // Flag para evitar múltiples ejecuciones
  const isExecutingTestCreation = useRef(false)
  const hasProcessedTestInfo = useRef(false)

  useEffect(() => {
    // Cargar categorías una sola vez al montar
    loadCategories()
  }, [])

  useEffect(() => {
    // Solo procesar la información del test una vez que tengamos las categorías necesarias
    if (hasProcessedTestInfo.current) return

    if (slug === "generic") {
      setTestInfo({ type: "generic", name: "" })
      hasProcessedTestInfo.current = true
    } else {
      // Buscar si es un test específico
      const specificTest = testsData.find(t => t.id === slug)
      if (specificTest) {
        setTestInfo({
          type: "specific",
          name: specificTest.title,
          testId: specificTest.id
        })
        hasProcessedTestInfo.current = true
      } else if (categories.length > 0) {
        // Si no es específico y ya tenemos categorías, buscar categoría
        const category = categories.find(cat => cat.id === slug)
        if (category) {
          setTestInfo({
            type: "category",
            name: category.name,
            categoryId: category.id
          })
          hasProcessedTestInfo.current = true
        }
      }
    }
  }, [slug, categories])

  useEffect(() => {
    // Solo ejecutar cuando:
    // 1. Tengamos la información del test procesada
    // 2. No estemos ya ejecutando la creación
    // 3. Tengamos usuario o podamos abrir el login
    if (!hasProcessedTestInfo.current || isExecutingTestCreation.current) {
      return
    }

    if (testInfo.type !== "generic" && !testInfo.name) {
      return // Esperar a que se determine el tipo de test
    }

    // Verificar autenticación y ejecutar la creación del test
    if (user) {
      executeTestCreation()
    } else {
      openLogin(() => {
        // Este callback se ejecutará después del login exitoso
        executeTestCreation()
      })
    }
  }, [user, testInfo])

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

  const executeTestCreation = async () => {
    // Evitar múltiples ejecuciones
    if (isExecutingTestCreation.current || isPreparingTest) {
      console.log("Test creation already in progress, skipping...")
      return
    }

    isExecutingTestCreation.current = true
    setIsPreparingTest(true)
    setPreparingTestError(null)

    try {
      console.log(`Iniciando creación de test ${testInfo.type}...`)

      const timer = new Promise((resolve) => setTimeout(resolve, 3000))

      const testCreation = async () => {
        const supabase = createClient()
        const createTestUseCase = CreateTestUseCase.create(supabase)
        
        let testExecutionId: number
        
        if (testInfo.type === "specific" && testInfo.testId) {
          // Test específico
          testExecutionId = await createTestUseCase.execute(undefined, testInfo.testId)
        } else if (testInfo.type === "category" && testInfo.categoryId) {
          // Test de categoría
          testExecutionId = await createTestUseCase.execute(testInfo.categoryId)
        } else {
          // Test genérico
          testExecutionId = await createTestUseCase.execute()
        }

        console.log(`Test creado exitosamente con ID de ejecución: ${testExecutionId}`)
        return testExecutionId
      }

      const [testExecutionId] = await Promise.all([testCreation(), timer])

      router.push(`/test/${testExecutionId}`)
    } catch (error: any) {
      console.error("Error starting test:", error)
      setPreparingTestError(
        error.message ||
          "Ocurrió un error al preparar el test. Por favor, inténtalo de nuevo."
      )
      isExecutingTestCreation.current = false // Resetear flag en caso de error
    } finally {
      setIsPreparingTest(false)
    }
  }

  const handleRetryTest = () => {
    isExecutingTestCreation.current = false // Resetear flag para permitir reintentos
    setPreparingTestError(null)
    executeTestCreation()
  }

  const getTestType = (): "generic" | "category" => {
    return testInfo.type === "specific" ? "category" : testInfo.type
  }

  return (
    <PreparingTestScreen
      onRetry={handleRetryTest}
      testType={getTestType()}
      categoryName={testInfo.name}
      errorMessage={preparingTestError}
    />
  )
} 