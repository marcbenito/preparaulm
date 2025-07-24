import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cómo Funciona - Guía de Uso de la Plataforma",
  description:
    "Descubre cómo funciona PreparaUlm paso a paso. Aprende a usar nuestra plataforma de tests para preparar tu examen de piloto ULM de forma eficiente y efectiva.",
  keywords: [
    "cómo funciona PreparaUlm",
    "guía uso plataforma ULM",
    "tutorial preparación examen",
    "instrucciones tests ULM",
    "manual usuario aviación",
    "preparación piloto guía"
  ],
  alternates: {
    canonical: "/como-funciona",
  },
  openGraph: {
    title: "Cómo Funciona - Guía de Uso de la Plataforma",
    description: "Descubre cómo usar PreparaUlm para preparar tu examen de piloto ULM de forma eficiente.",
    url: "https://www.preparaulm.com/como-funciona",
    type: "website",
  },
}

export default function ComoFuncionaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 