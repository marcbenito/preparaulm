"use client"

import React from "react"
import { Check, X } from "@/components/ui/icons"

interface ComparisonFeature {
  name: string
  free: string | boolean
  solo: string | boolean
  instructor: string | boolean
}

interface ComparisonCategory {
  category: string
  features: ComparisonFeature[]
}

const comparisonFeatures: ComparisonCategory[] = [
  {
    category: "Acceso al Contenido",
    features: [
      {
        name: "Preguntas de Práctica",
        free: "500",
        solo: "2000",
        instructor: "2000",
      },
      {
        name: "Simulaciones de Examen",
        free: "1",
        solo: "10",
        instructor: "10",
      },
      {
        name: "Categorías de Preguntas",
        free: "3",
        solo: "Todas",
        instructor: "Todas",
      },
      {
        name: "Material de Estudio",
        free: "Básico",
        solo: "Avanzado",
        instructor: "Avanzado",
      },
      {
        name: "Acceso Sin Conexión",
        free: false,
        solo: true,
        instructor: true,
      },
    ],
  },
  {
    category: "Herramientas de Aprendizaje",
    features: [
      {
        name: "Seguimiento de Progreso",
        free: "Básico",
        solo: "Avanzado",
        instructor: "Avanzado",
      },
      {
        name: "Análisis de Rendimiento",
        free: false,
        solo: true,
        instructor: true,
      },
      {
        name: "Planes de Estudio Personalizados",
        free: false,
        solo: true,
        instructor: true,
      },
      {
        name: "Revisiones de Exámenes",
        free: "Limitado",
        solo: "Ilimitado",
        instructor: "Ilimitado",
      },
      {
        name: "Análisis de Errores",
        free: false,
        solo: true,
        instructor: true,
      },
    ],
  },
  {
    category: "Funciones de Enseñanza",
    features: [
      {
        name: "Gestión de Estudiantes",
        free: false,
        solo: false,
        instructor: true,
      },
      {
        name: "Informes de Progreso",
        free: false,
        solo: false,
        instructor: true,
      },
      {
        name: "Análisis de Estudiantes",
        free: false,
        solo: false,
        instructor: true,
      },
      {
        name: "Tareas Personalizadas",
        free: false,
        solo: false,
        instructor: true,
      },
      { name: "Gestión de Grupos", free: false, solo: false, instructor: true },
    ],
  },
  {
    category: "Soporte",
    features: [
      {
        name: "Soporte por Email",
        free: "Estándar",
        solo: "Prioritario",
        instructor: "Prioritario",
      },
      {
        name: "Tiempo de Respuesta",
        free: "48h",
        solo: "24h",
        instructor: "12h",
      },
      { name: "Acceso a Comunidad", free: true, solo: true, instructor: true },
      {
        name: "Sesiones de Formación",
        free: false,
        solo: "1/mes",
        instructor: "2/mes",
      },
      {
        name: "Gestor de Cuenta Dedicado",
        free: false,
        solo: false,
        instructor: true,
      },
    ],
  },
]

const ComparisonTable = () => {
  const renderCellValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-400 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-400 mx-auto" />
      )
    }
    return <span className="text-blue-200">{value}</span>
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">
          Comparación de Características
        </h2>
        <p className="text-blue-200 mt-2">
          Compara todos los planes para encontrar el que mejor se adapte a tus
          necesidades
        </p>
      </div>

      {/* Table - Same for all screen sizes */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="sticky top-0 bg-white/10 backdrop-blur-sm z-10">
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white min-w-[200px]">
                Característica
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white min-w-[120px]">
                Gratuito
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white min-w-[120px]">
                Solo
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white min-w-[120px]">
                Instructor
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((category) => (
              <React.Fragment key={category.category}>
                <tr className="bg-white/5">
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-sm font-semibold text-blue-300"
                  >
                    {category.category}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr
                    key={feature.name}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-blue-100">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {renderCellValue(feature.free)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderCellValue(feature.solo)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderCellValue(feature.instructor)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComparisonTable
