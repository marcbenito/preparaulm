import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Guías y Consejos para Pilotos ULM",
  description:
    "Descubre artículos, guías y consejos sobre aviación ultraligera. Todo lo que necesitas saber para convertirte en piloto ULM y aprobar tu examen.",
  keywords: [
    "blog aviación ultraligera",
    "artículos piloto ULM",
    "guías examen ultraligero",
    "consejos aviación ULM",
    "noticias aviación ligera",
    "formación piloto blog",
    "recursos aviación ULM"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog - Guías y Consejos para Pilotos ULM",
    description: "Artículos, guías y consejos sobre aviación ultraligera para futuros pilotos.",
    url: "https://www.preparaulm.com/blog",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 