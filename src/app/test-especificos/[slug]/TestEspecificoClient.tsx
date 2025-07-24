"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  Target,
  ArrowLeft,
  Trophy,
} from "@/components/ui/icons"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { CategoryIcon } from "@/components/ui/CategoryIcon"
import { datadogRum } from "@datadog/browser-rum"

interface Test {
  id: string
  slug: string
  title: string
  description: string
  extendedDescription: string
  categoryId: string
  categoryName: string
  level: string
  levelColor: string
  questionCount: number
  duration: number
  imageUrl: string
  topics: string[]
}

interface TestEspecificoClientProps {
  test: Test
}

export default function TestEspecificoClient({ test }: TestEspecificoClientProps) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getLevelBadgeClasses = (levelColor: string) => {
    const colorMap: { [key: string]: string } = {
      orange: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
      purple: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      red: "bg-red-500/20 text-red-300 border border-red-500/30",
    }
    return colorMap[levelColor] || colorMap.orange
  }

  const getCategoryIconName = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      "Meteorología": "Cloud",
      "Navegación": "NavigationIcon",
      "Comunicaciones": "Radio",
    }
    return iconMap[categoryName] || "FileQuestion"
  }

  const getCategoryColor = (categoryName: string) => {
    const colorMap: { [key: string]: string } = {
      "Meteorología": "from-sky-500 to-blue-500",
      "Navegación": "from-pink-500 to-rose-500",
      "Comunicaciones": "from-purple-500 to-indigo-500",
    }
    return colorMap[categoryName] || "from-gray-500 to-gray-600"
  }

  const handleStartTest = () => {
    // Trackear evento en Datadog
    if (datadogRum.getInternalContext()) {
      console.log('🎯 Test específico iniciado:', test.title)
      datadogRum.addAction('test_started', {
        type: 'byId',
        test_id: test.id,
        test_name: test.title,
        test_category: test.categoryName,
        test_level: test.level,
        question_count: test.questionCount,
        duration_minutes: test.duration,
        source: 'test_especifico_page'
      })
    }

    router.push(`/preparacion-test/${test.id}`)
  }

  // Datos estructurados para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": test.title,
    "description": test.description,
    "educationalLevel": test.level,
    "learningResourceType": "Quiz",
    "interactivityType": "active",
    "timeRequired": `PT${test.duration}M`,
    "numberOfQuestions": test.questionCount,
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "targetName": test.categoryName,
      "educationalFramework": "Examen ULM España"
    },
    "about": {
      "@type": "Thing",
      "name": "Piloto de Ultraligero",
      "description": "Examen teórico para obtener la licencia de piloto de ultraligero en España"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-blue-purple">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-blue-200 mb-8">
              <Link href="/test-ultraligero" className="hover:text-white transition-colors">
                Tests de ultraligero
              </Link>
              <span>/</span>
              <Link href="/test-especificos" className="hover:text-white transition-colors">
                Tests específicos
              </Link>
              <span>/</span>
              <span className="text-white">{test.title}</span>
            </div>

            {/* Header sticky con imagen */}
            <div className={`sticky top-16 z-10 transition-all duration-500 ease-in-out ${
              isScrolled ? 'h-24' : 'h-64'
            } bg-cover bg-center relative rounded-xl overflow-hidden mb-8`}
            style={{
              backgroundImage: `url('${test.imageUrl}')`,
            }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
                isScrolled ? 'p-4' : 'p-8'
              }`}>
                <h1 className={`font-bold text-white transition-all duration-500 ${
                  isScrolled ? 'text-xl mb-0' : 'text-4xl mb-2'
                }`}>
                  {test.title}
                </h1>
              </div>
            </div>

            {/* Información principal */}
            <Card className="bg-white/5 text-white border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-lg mb-4">Información del test</CardTitle>
                
                {/* Descripción */}
                <p className="text-blue-200 leading-relaxed mb-6">
                  {test.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <span className="text-blue-200 text-sm md:text-base">Dificultad:</span>
                      <Badge
                        variant="secondary"
                        className={`${getLevelBadgeClasses(test.levelColor)}`}
                      >
                        Nivel {test.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-semibold text-base md:text-lg">{test.questionCount}</span>
                      <span className="text-blue-200 text-sm md:text-base">preguntas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-semibold text-base md:text-lg">{test.duration}</span>
                      <span className="text-blue-200 text-sm md:text-base">minutos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CategoryIcon
                      iconName={getCategoryIconName(test.categoryName)}
                      color={getCategoryColor(test.categoryName)}
                      className="h-5 w-5 flex-shrink-0"
                    />
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-semibold text-base md:text-lg">{test.categoryName}</span>
                      <span className="text-blue-200 text-sm md:text-base">categoría</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Descripción extendida */}
            <Card className="bg-white/5 text-white border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Acerca de este test</CardTitle>
                <div className="space-y-4 text-blue-200">
                  {test.extendedDescription.split('. ').map((sentence, index) => {
                    // Identificar si es el primer párrafo o contiene información clave
                    const isIntro = index === 0;
                    const hasKeyInfo = sentence.includes('incluye') || sentence.includes('cubre') || sentence.includes('aprenderás');
                    
                    if (sentence.trim()) {
                      return (
                        <div key={index} className={isIntro ? "text-base" : ""}>
                          {hasKeyInfo && <h4 className="text-white font-semibold mb-1">Contenido del test:</h4>}
                          <p className="leading-relaxed">
                            {sentence.trim()}{index < test.extendedDescription.split('. ').length - 1 ? '.' : ''}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardHeader>
            </Card>

            {/* Temas incluidos */}
            <Card className="bg-white/5 text-white border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-xl mb-4 flex items-center">
                  <Target className="h-6 w-6 text-yellow-400 mr-2" />
                  Temas incluidos
                </CardTitle>
                <div className="grid md:grid-cols-2 gap-3">
                  {test.topics.map((topic, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-200">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Categoría */}
            <Card className="bg-white/5 text-white border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Categoría relacionada</CardTitle>
                <p className="text-blue-200 mb-4">
                  Este test pertenece a la categoría de <strong className="text-white">{test.categoryName}</strong>, 
                  una de las áreas fundamentales del examen de piloto de ultraligero. 
                  Dominar estos conceptos específicos te ayudará a mejorar tu puntuación 
                  general en esta categoría.
                </p>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <CategoryIcon
                    iconName={getCategoryIconName(test.categoryName)}
                    color={getCategoryColor(test.categoryName)}
                    className="h-12 w-12"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{test.categoryName}</h3>
                    <p className="text-sm text-blue-200">Categoría principal</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* CTA */}
            <div className="flex flex-row gap-3 justify-center">
              <Link href="/test-especificos" className="flex-1 sm:flex-initial">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Ver más tests</span>
                  <span className="sm:hidden">Más tests</span>
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white flex-1 sm:flex-initial"
                onClick={handleStartTest}
              >
                Comenzar Test
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 