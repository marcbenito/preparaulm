"use client"

import React from "react"
import ComparisonTable from "@/app/pricing/_components/ComparisonTable"
import { Check, X } from "@/components/ui/icons"

export default function ComparisonTableStyleguide() {
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
    <main className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            Tabla Comparativa - Guía de Estilos
          </h1>
          <p className="text-xl text-blue-200">
            Componente para mostrar comparaciones entre diferentes planes o
            características.
          </p>
        </div>

        {/* Ejemplo completo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ejemplo Completo
          </h2>
          <ComparisonTable />
        </section>

        {/* Variantes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Variantes</h2>

          {/* Tabla simple sin sticky */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Tabla Simple (Sin Sticky Header)
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h4 className="text-lg font-bold text-white">
                  Comparación Básica
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead className="bg-white/10">
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white min-w-[200px]">
                        Característica
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white min-w-[100px]">
                        Plan A
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white min-w-[100px]">
                        Plan B
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="px-6 py-4 text-blue-100">
                        Característica 1
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCellValue(true)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCellValue(false)}
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="px-6 py-4 text-blue-100">
                        Característica 2
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCellValue("Básico")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCellValue("Avanzado")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Casos de Uso</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <ul className="space-y-3 text-blue-200">
              <li>
                • <strong className="text-white">Páginas de precios:</strong>{" "}
                Comparar diferentes planes de suscripción
              </li>
              <li>
                •{" "}
                <strong className="text-white">
                  Comparativas de productos:
                </strong>{" "}
                Mostrar diferencias entre versiones
              </li>
              <li>
                •{" "}
                <strong className="text-white">
                  Características de servicios:
                </strong>{" "}
                Detallar qué incluye cada nivel
              </li>
              <li>
                • <strong className="text-white">Análisis competitivo:</strong>{" "}
                Comparar con la competencia
              </li>
            </ul>
          </div>
        </section>

        {/* Características técnicas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Características Técnicas
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Desktop
                </h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Header sticky con z-index 10</li>
                  <li>• Tabla completa siempre visible</li>
                  <li>• Hover effects en filas</li>
                  <li>• Backdrop blur para mejor legibilidad</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Mobile
                </h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Mismo diseño que desktop</li>
                  <li>• Scroll horizontal automático</li>
                  <li>• Ancho mínimo garantizado</li>
                  <li>• Sticky header mantenido</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tokens de diseño */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Tokens de Diseño
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Colores
                </h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>
                    • <span className="text-green-400">Verde</span>:
                    text-green-400 (✓)
                  </li>
                  <li>
                    • <span className="text-red-400">Rojo</span>: text-red-400
                    (✗)
                  </li>
                  <li>
                    • <span className="text-blue-200">Azul claro</span>:
                    text-blue-200
                  </li>
                  <li>
                    • <span className="text-blue-300">Azul medio</span>:
                    text-blue-300
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Espaciado
                </h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>• Padding: px-6 py-4</li>
                  <li>• Min-width: 600px tabla, 200px primera col</li>
                  <li>• Margins: mb-16, mb-6</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Bordes
                </h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>• Border: border-white/10</li>
                  <li>• Radius: rounded-2xl</li>
                  <li>• Dividers: border-white/5</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
