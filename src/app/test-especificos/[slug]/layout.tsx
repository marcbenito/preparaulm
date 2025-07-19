import { Metadata } from "next"
import testsData from "../tests-data.json"

interface TestEspecificoLayoutProps {
  children: React.ReactNode
  params: Promise<{
    slug: string
  }>
}

// Generar rutas estáticas para build time
export async function generateStaticParams() {
  return testsData.map((test) => ({
    slug: test.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const test = testsData.find((t) => t.slug === slug)
  
  if (!test) {
    return {
      title: "Test no encontrado | PreparaUlm",
      description: "El test que buscas no existe",
    }
  }

  return {
    title: `${test.title} - Test Específico ULM | PreparaUlm`,
    description: test.description,
    keywords: `${test.title.toLowerCase()}, test ultraligero ${test.categoryName.toLowerCase()}, examen ULM ${test.categoryName.toLowerCase()}, ${test.topics.slice(0, 3).join(", ").toLowerCase()}`,
    openGraph: {
      title: `${test.title} - Test Específico ULM`,
      description: test.description,
      type: "website",
      images: [
        {
          url: test.imageUrl,
          width: 800,
          height: 400,
          alt: test.title,
        },
      ],
    },
  }
}

export default function TestEspecificoLayout({ children }: TestEspecificoLayoutProps) {
  return <>{children}</>
} 