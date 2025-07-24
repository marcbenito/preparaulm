import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nosotros - Plataforma de Tests de Aviación",
  description:
    "Conoce más sobre PreparaUlm, la plataforma moderna de preparación para exámenes de aviación ultraligera. Creada por y para entusiastas de la aviación con más de 5000 preguntas actualizadas.",
  keywords: [
    "sobre PreparaUlm",
    "plataforma tests aviación",
    "preparación exámenes ULM",
    "Marc Benito",
    "aviación ultraligera",
    "formación piloto ULM",
    "historia PreparaUlm",
    "equipo aviación"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Sobre Nosotros - PreparaUlm",
    description: "Conoce más sobre PreparaUlm, la plataforma moderna de preparación para exámenes de aviación ultraligera.",
    url: "https://www.preparaulm.com/about",
    type: "website",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
