"use client"

import { Card } from "@/components/ui/Card"
import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { GetMainCategoriesUseCase } from "@/domain/use-cases/GetMainCategoriesUseCase"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Category } from "@/domain/entities/Category"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import { motion } from "framer-motion"
import { Trophy, Eye, PlayCircle, ArrowUpRight } from "@/components/ui/icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const categoryProgressData = [
  {
    date: "2023-10",
    Meteorología: 45,
    Rendimiento: 38,
    Radio: 52,
    Sistemas: 48,
    Navegación: 42,
    Planificación: 35,
    Humanos: 50,
    Legislación: 45,
    Procedimientos: 40,
  },
  {
    date: "2023-11",
    Meteorología: 62,
    Rendimiento: 45,
    Radio: 68,
    Sistemas: 55,
    Navegación: 58,
    Planificación: 42,
    Humanos: 65,
    Legislación: 53,
    Procedimientos: 48,
  },
  {
    date: "2023-12",
    Meteorología: 58,
    Rendimiento: 52,
    Radio: 75,
    Sistemas: 62,
    Navegación: 55,
    Planificación: 48,
    Humanos: 72,
    Legislación: 60,
    Procedimientos: 55,
  },
  {
    date: "2024-01",
    Meteorología: 65,
    Rendimiento: 48,
    Radio: 82,
    Sistemas: 58,
    Navegación: 62,
    Planificación: 45,
    Humanos: 78,
    Legislación: 65,
    Procedimientos: 50,
  },
  {
    date: "2024-02",
    Meteorología: 72,
    Rendimiento: 65,
    Radio: 78,
    Sistemas: 75,
    Navegación: 70,
    Planificación: 52,
    Humanos: 85,
    Legislación: 73,
    Procedimientos: 68,
  },
  {
    date: "2024-03",
    Meteorología: 85,
    Rendimiento: 78,
    Radio: 92,
    Sistemas: 88,
    Navegación: 82,
    Planificación: 75,
    Humanos: 90,
    Legislación: 85,
    Procedimientos: 80,
  },
]

const categoryColors = {
  Meteorología: "#3b82f6",
  Rendimiento: "#10b981",
  Radio: "#8b5cf6",
  Sistemas: "#ef4444",
  Navegación: "#ec4899",
  Planificación: "#f59e0b",
  Humanos: "#14b8a6",
  Legislación: "#9333ea",
  Procedimientos: "#db2777",
}

interface CategoryMetrics {
  id: string
  totalTests: number
  avgTimeMinutes: number
  passRate: number
}

const metrics: CategoryMetrics[] = [
  {
    id: "meteorologia",
    totalTests: 250,
    avgTimeMinutes: 45,
    passRate: 85,
  },
  {
    id: "performance",
    totalTests: 180,
    avgTimeMinutes: 40,
    passRate: 78,
  },
  {
    id: "comunicaciones",
    totalTests: 150,
    avgTimeMinutes: 35,
    passRate: 82,
  },
  {
    id: "conocimiento-aeronave",
    totalTests: 200,
    avgTimeMinutes: 50,
    passRate: 75,
  },
  {
    id: "navegacion",
    totalTests: 220,
    avgTimeMinutes: 45,
    passRate: 80,
  },
  {
    id: "principios-vuelo",
    totalTests: 160,
    avgTimeMinutes: 40,
    passRate: 77,
  },
  {
    id: "factores-humanos",
    totalTests: 140,
    avgTimeMinutes: 30,
    passRate: 88,
  },
  {
    id: "derecho-aereo",
    totalTests: 190,
    avgTimeMinutes: 45,
    passRate: 83,
  },
  {
    id: "procedimientos",
    totalTests: 170,
    avgTimeMinutes: 35,
    passRate: 81,
  },
]

export default function TestCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()
      const useCase = GetMainCategoriesUseCase.create(supabase)
      const result = await useCase.execute()
      setCategories(result)
    }

    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-6 py-12 flex-grow">
      <h1 className="text-3xl font-bold text-white mb-8">
        Categorías de Pruebas
      </h1>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Categoría
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                Preguntas
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                Tests
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                Tasa de Éxito
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                Progreso
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              const categoryMetrics = metrics.find(
                (m: CategoryMetrics) => m.id === category.id,
              )
              const progress = categoryMetrics
                ? (categoryMetrics.totalTests / category.totalQuestions) * 100
                : 0
              return (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <CategoryIcon
                        iconName={category.iconName}
                        color={category.color}
                      />
                      <span className="font-medium text-white">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-blue-200">
                      {category.totalQuestions}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-blue-200">
                      {categoryMetrics?.totalTests || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        (categoryMetrics?.passRate || 0) >= 85
                          ? "bg-green-500/20 text-green-400"
                          : (categoryMetrics?.passRate || 0) >= 70
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {categoryMetrics?.passRate || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full">
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/test/${category.id}/review`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Revisar
                        </Button>
                      </Link>
                      <Link href={`/test-ultraligero?category=${category.id}`}>
                        <Button variant="primary-gradient" size="sm">
                          <PlayCircle className="h-5 w-5 mr-1" />
                          Hacer Prueba
                        </Button>
                      </Link>
                      <ArrowUpRight className="h-5 w-5 text-blue-200 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold text-white mb-6">
          Línea de Tiempo del Progreso
        </h2>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={categoryProgressData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: "rgba(255,255,255,0.5)" }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: "rgba(255,255,255,0.5)" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  paddingTop: "20px",
                  color: "rgba(255,255,255,0.8)",
                }}
              />
              {Object.entries(categoryColors).map(([category, color]) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12"
      >
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-1">
          <div className="bg-cosmic-night rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-4 rounded-xl">
                  <Trophy className="h-12 w-12 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    ¿Listo para el Examen Real?
                  </h2>
                  <p className="text-yellow-300">
                    Realiza una simulación completa del examen en condiciones
                    reales
                  </p>
                </div>
              </div>
              <Button variant="primary-gradient" className="w-full md:w-auto">
                Iniciar Simulación
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
