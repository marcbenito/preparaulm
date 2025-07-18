import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Planes y Precios - AeroTest ULM | Preparación Exámenes ULM",
  description:
    "Descubre nuestros planes de precios para la preparación de exámenes ULM. Desde acceso gratuito hasta planes premium para instructores. Comienza tu formación hoy.",
  keywords:
    "precios AeroTest ULM, planes preparación ULM, exámenes ULM precio, formación piloto ULM, instructor ULM, simulación examen ULM",
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
