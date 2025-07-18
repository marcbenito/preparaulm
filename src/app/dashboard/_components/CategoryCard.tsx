"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/Progress"
import { Category } from "./Types"
import { CategoryIcon } from "@/components/ui/CategoryIcon"

interface CategoryCardProps {
  category: Category
  index: number
}

const confidenceDescriptions = {
  1: {
    label: "Mala",
    description:
      "Necesitas estudiar mucho más esta materia. Tu conocimiento es limitado y requiere dedicación adicional.",
  },
  2: {
    label: "Regular",
    description:
      "Tienes conocimientos básicos pero necesitas reforzar conceptos importantes de esta categoría.",
  },
  3: {
    label: "Buena",
    description:
      "Dominas bien la materia aunque podrías mejorar en algunos aspectos específicos.",
  },
  4: {
    label: "Muy buena",
    description:
      "Excelente dominio de la materia. Solo necesitas pulir algunos detalles menores.",
  },
  5: {
    label: "Excelente",
    description:
      "Dominio completo de la materia. Estás perfectamente preparado en esta categoría.",
  },
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 5) return "bg-green-500"
  if (confidence >= 4) return "bg-lime-500"
  if (confidence >= 3) return "bg-yellow-500"
  if (confidence >= 2) return "bg-orange-500"
  return "bg-red-500"
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      key={category.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all relative group"
      data-testid="category-card"
    >
      <Link href={`/category/${category.slug}`} className="block">
        <div className="flex items-start gap-3">
          <div
            className={`bg-gradient-to-r ${category.color} p-2.5 rounded-lg`}
          >
            <CategoryIcon
              iconName={category.iconName}
              color={category.color}
              className="h-5 w-5 text-white"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white mb-2 text-sm truncate">
              {category.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 text-xs">
                  Nota media (ult.tests)
                </span>
                <span
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium
                    ${
                      category.score >= 85
                        ? "bg-green-500/20 text-green-400"
                        : category.score >= 70
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {category.score}%
                </span>
              </div>

              {Number(category.minProgress) < 100 ? (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-blue-200">Recopilando datos</span>
                    <span className="text-blue-400">
                      {category.minProgress}%
                    </span>
                  </div>
                  <div className="group">
                    <Progress
                      value={category.minProgress}
                      className="h-1.5 bg-blue-900"
                      indicatorClassName="bg-blue-500"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg pointer-events-none z-10">
                      {
                        "No tenemos suficientes datos para calcular el progreso mínimo"
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-blue-200">Confianza</span>
                    <span className="text-blue-200">
                      {
                        confidenceDescriptions[
                          category.confidence as keyof typeof confidenceDescriptions
                        ].label
                      }
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full relative group">
                    <div
                      className={`h-full ${getConfidenceColor(category.confidence)} rounded-full transition-all`}
                      style={{
                        width: `${((category.confidence - 1) / 4) * 100}%`,
                      }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[2px]">
                      {[1, 2, 3, 4, 5].map((point) => (
                        <div
                          key={point}
                          className={`w-0.5 h-full ${point <= category.confidence ? "bg-white/20" : "bg-white/5"}`}
                        />
                      ))}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg pointer-events-none z-10">
                      {
                        confidenceDescriptions[
                          category.confidence as keyof typeof confidenceDescriptions
                        ].description
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
