import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categorías de Test - AeroTest ULM | Todas las Áreas de Estudio",
  description:
    "Explora todas las categorías de estudio para tu licencia ULM: meteorología, navegación, sistemas, legislación y más. Tests específicos para cada área.",
  keywords:
    "categorías test ULM, temas examen ULM, meteorología aviación, navegación aérea, sistemas aeronaves, legislación aérea, preparación ULM",
}

export default function TestCategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
