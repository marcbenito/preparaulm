import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categorías de Test - Todas las Áreas de Estudio",
  description:
    "Explora todas las categorías de estudio para tu licencia ULM: meteorología, navegación, sistemas, legislación y más. Tests específicos organizados por áreas temáticas.",
  keywords: [
    "categorías test ULM",
    "temas examen ULM",
    "meteorología aviación",
    "navegación aérea",
    "sistemas aeronaves",
    "legislación aérea",
    "preparación ULM",
    "áreas estudio piloto"
  ],
  alternates: {
    canonical: "/test-categories",
  },
  openGraph: {
    title: "Categorías de Test - Todas las Áreas de Estudio",
    description: "Explora todas las categorías de estudio para tu licencia ULM organizadas por áreas temáticas.",
    url: "https://www.preparaulm.com/test-categories",
    type: "website",
  },
}

export default function TestCategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
