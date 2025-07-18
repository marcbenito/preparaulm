import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nosotros - AeroTest ULM | Plataforma de Tests de Aviación",
  description:
    "Conoce más sobre AeroTest ULM, la plataforma moderna de preparación para exámenes de aviación ultraligera. Creada por y para entusiastas de la aviación.",
  keywords:
    "sobre AeroTest ULM, plataforma tests aviación, preparación exámenes ULM, Marc Benito, aviación ultraligera, formación piloto ULM",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
