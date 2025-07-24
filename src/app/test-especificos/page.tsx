import { Metadata } from "next"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  ArrowRight,
  BarChart3,
} from "@/components/ui/icons"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import testsData from "./tests-data.json"

export const metadata: Metadata = {
  title: "Tests Específicos de Ultraligero",
  description: "Tests especializados para profundizar en temas concretos del examen ULM. Meteorología, navegación, comunicaciones y más áreas específicas de estudio.",
  keywords: [
    "test ultraligero específico",
    "examen ULM especializado", 
    "meteorología aviación",
    "navegación aérea",
    "comunicaciones emergencia",
    "tests temáticos ULM",
    "preparación específica piloto"
  ],
  alternates: {
    canonical: "/test-especificos",
  },
  openGraph: {
    title: "Tests Específicos de Ultraligero | PreparaUlm",
    description: "Tests especializados para profundizar en temas concretos del examen ULM",
    url: "https://www.preparaulm.com/test-especificos",
    type: "website",
  },
}

export default function TestsEspecificosPage() {

  const getLevelBadgeClasses = (levelColor: string) => {
    const colorMap: { [key: string]: string } = {
      orange: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
      purple: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      red: "bg-red-500/20 text-red-300 border border-red-500/30",
    }
    return colorMap[levelColor] || colorMap.orange
  }

  return (
    <div className="min-h-screen bg-blue-purple">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tests Específicos de Ultraligero
          </h1>
          <p className="text-xl text-blue-200 mb-10">
            Tests especializados para profundizar en temas concretos del examen ULM
          </p>

          <div className="mb-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">
                Tests disponibles
              </h2>
            </div>
            <p className="text-blue-200 mb-8 text-lg">
              Hemos seleccionado unos tests hechos a medida para profundizar
              sobre temas concretos del examen ULM. Si te sientes valiente y
              quieres poner a prueba tus conocimientos especializados, ¡estos
              desafíos son para ti!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testsData.map((test) => (
              <Link
                key={test.id}
                href={`/test-especificos/${test.slug}`}
                className="group block"
              >
                <Card className="bg-white/5 text-white border-0 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  <div
                    className="h-32 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${test.imageUrl}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge
                      variant="secondary"
                      className={`absolute top-3 right-3 ${getLevelBadgeClasses(test.levelColor)}`}
                    >
                      Nivel {test.level}
                    </Badge>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-200 transition-colors mb-3">
                      {test.title}
                    </CardTitle>
                    <p className="text-blue-200 text-sm mb-4">
                      {test.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-blue-300 text-sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{test.questionCount} preguntas</span>
                        </div>
                        <div className="flex items-center text-blue-300 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{test.duration} min</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/test-ultraligero">
              <Button variant="outline" size="lg">
                Volver a Tests de Ultraligero
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 