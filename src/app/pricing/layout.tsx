import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Planes y Precios - Preparación Exámenes ULM",
  description:
    "Descubre nuestros planes de precios para la preparación de exámenes ULM. Desde acceso gratuito hasta planes premium para instructores. Comienza tu formación hoy mismo.",
  keywords: [
    "precios PreparaUlm",
    "planes preparación ULM",
    "exámenes ULM precio",
    "formación piloto ULM",
    "instructor ULM",
    "simulación examen ULM",
    "suscripción aviación",
    "plan premium ULM"
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Planes y Precios - Preparación Exámenes ULM",
    description: "Descubre nuestros planes de precios para la preparación de exámenes ULM.",
    url: "https://www.preparaulm.com/pricing",
    type: "website",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
