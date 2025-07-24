import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test de Ultraligero - Simulación Examen ULM",
  description:
    "Realiza tests de simulación para tu examen de piloto ultraligero. Preguntas actualizadas según normativa AESA, con seguimiento de progreso y análisis detallado.",
  keywords: [
    "test ultraligero",
    "simulación examen ULM",
    "examen piloto ultraligero",
    "test AESA aviación",
    "preparación ULM online",
    "simulacro examen piloto",
    "test multieje ala fija"
  ],
  alternates: {
    canonical: "/test-ultraligero",
  },
  openGraph: {
    title: "Test de Ultraligero - Simulación Examen ULM",
    description: "Realiza tests de simulación para tu examen de piloto ultraligero con preguntas actualizadas.",
    url: "https://www.preparaulm.com/test-ultraligero",
    type: "website",
  },
}

export default function TestUltraligeroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 