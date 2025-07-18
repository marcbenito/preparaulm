"use client"

import React from "react"
import PricingCard from "./_components/PricingCard"
import PricingFaqs from "./_components/PricingFaqs"
import ComparisonTable from "./_components/ComparisonTable"

const plans = [
  {
    name: "Gratuito",
    price: "€0",
    description: "Perfecto para empezar",
    features: [
      "500 preguntas de práctica",
      "1 simulación de examen",
      "Seguimiento básico del progreso",
      "Soporte estándar",
    ],
    action: "Comenzar",
    popular: false,
  },
  {
    name: "Solo",
    price: "€5",
    period: "/mes",
    description: "Todo lo que necesitas para tener éxito",
    features: [
      "2000 preguntas de práctica",
      "10 simulaciones de examen",
      "Revisiones ilimitadas de exámenes",
      "Seguimiento avanzado del progreso",
      "Soporte prioritario",
      "Análisis de rendimiento",
    ],
    action: "Empezar a Estudiar",
    popular: true,
  },
  {
    name: "Instructor",
    price: "€5",
    period: "/mes",
    description: "Supervisa el progreso de tus estudiantes",
    features: [
      "Todas las características de Solo",
      "Hasta 5 estudiantes",
      "Seguimiento del progreso de estudiantes",
      "Análisis de rendimiento",
      "Informes detallados de estudiantes",
      "Panel de instructor",
    ],
    action: "Empezar a Enseñar",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Elige Tu Camino de Aprendizaje
          </h1>
          <p className="text-xl text-blue-200">
            Selecciona el plan que mejor se adapte a tus necesidades y comienza
            tu viaje para convertirte en un piloto certificado.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <ComparisonTable />
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <PricingFaqs />
        </div>
      </div>
    </main>
  )
}
