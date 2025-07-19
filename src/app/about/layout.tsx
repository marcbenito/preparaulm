import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nosotros - PreparaUlm | Plataforma de Tests de Aviación",
  description:
    "Conoce más sobre PreparaUlm, la plataforma moderna de preparación para exámenes de aviación ultraligera. Creada por y para entusiastas de la aviación.",
  keywords:
    "sobre PreparaUlm, plataforma tests aviación, preparación exámenes ULM, Marc Benito, aviación ultraligera, formación piloto ULM",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
