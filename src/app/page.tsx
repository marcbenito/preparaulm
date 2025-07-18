"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
  Star,
  Users,
  Trophy,
  ArrowRight,
  Brain,
  BarChart3,
  Calendar,
  BookOpen,
} from "@/components/ui/icons"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Más de 3.000 preguntas reales y actualizadas",
    description: (
      <>
        Contamos con una base de datos de más de 3.000 preguntas que cubren todo
        el temario oficial de{" "}
        <a
          href="https://www.seguridadaerea.gob.es/es/ambitos/formacion-y-examenes/examenes-de-piloto/examenes-teoricos-ulm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          AESA
        </a>
        , clasificadas por categoría y subcategoría. Cada pregunta está diseñada
        para ayudarte a entender y retener los conceptos clave del examen.
      </>
    ),
    color: "from-blue-500 to-cyan-500",
    stat: "3.000+ preguntas",
  },
  {
    icon: BarChart3,
    title: "Sistema inteligente de evaluación y progreso",
    description:
      "Nuestro algoritmo analiza tus resultados y detecta tus puntos débiles según las categorías oficiales. Gracias a la Inteligencia Artificial, AeroTest te guía paso a paso para que avances más rápido y con una comprensión real del temario, no solo memorización.",
    color: "from-purple-500 to-pink-500",
    stat: "IA personalizada",
  },
  {
    icon: BookOpen,
    title: "Marca tus dudas y consúltalas con tu instructor",
    description:
      "Puedes marcar fácilmente las preguntas que más te cuestan para revisarlas después o comentarlas directamente con tu instructor, optimizando tu estudio y resolviendo dudas de forma personalizada.",
    color: "from-green-500 to-emerald-500",
    stat: "Soporte personalizado",
  },
]

const flightSchools = [
  {
    name: "Academia de Vuelo AeroMadrid",
    location: "Madrid, España",
    logo: "https://images.unsplash.com/photo-1592647420148-bfcc177e2117?auto=format&fit=crop&q=80&w=200&h=200",
    description:
      "Escuela líder en formación de pilotos con más de 25 años de experiencia.",
    features: [
      "Certificado EASA",
      "Flota Moderna",
      "Estudiantes Internacionales",
    ],
  },
  {
    name: "Instituto de Aviación Barcelona",
    location: "Barcelona, España",
    logo: "https://images.unsplash.com/photo-1583396618422-6ed355c7df04?auto=format&fit=crop&q=80&w=200&h=200",
    description:
      "Especializada en formación de pilotos comerciales con simuladores de última generación.",
    features: [
      "Programa ATP",
      "Entrenamiento en Simulador",
      "Apoyo Profesional",
    ],
  },
  {
    name: "Academia Wings Valencia",
    location: "Valencia, España",
    logo: "https://images.unsplash.com/photo-1599156830144-7c2f0b9b6b66?auto=format&fit=crop&q=80&w=200&h=200",
    description:
      "Escuela boutique enfocada en enfoques de formación personalizados.",
    features: ["Clases Reducidas", "Formación 1 a 1", "Horario Flexible"],
  },
]

const blogPosts = [
  {
    title: "¿Qué necesitas para ser piloto de ultraligero?",
    excerpt:
      "Descubre todos los requisitos y pasos necesarios para convertirte en piloto.",
    date: "2024-03-15",
    readTime: "8 min",
    slug: "que-necesitas-para-ser-piloto",
  },
  {
    title: "Requisitos para presentarte al examen",
    excerpt:
      "Todo lo que debes saber sobre los requisitos específicos del examen oficial.",
    date: "2024-03-12",
    readTime: "6 min",
    slug: "requisitos-examen-ultraligero",
  },
  {
    title: "Temario completo del examen de ultraligero",
    excerpt: "Desglose detallado de todas las materias que debes estudiar.",
    date: "2024-03-08",
    readTime: "12 min",
    slug: "temario-examen-ultraligero",
  },
]

const licenseTypes = [
  {
    name: "Multieje Ala Fija",
    description:
      "Preparación completa para la licencia de piloto ULM multieje ala fija",
    link: "/test-selection",
    icon: "✈️",
    available: true,
    status: "Disponible ahora",
  },
  {
    name: "Autogiro",
    description: "Tests especializados para la licencia de autogiro ULM",
    link: "#",
    icon: "🚁",
    available: false,
    status: "Próximamente",
  },
  {
    name: "Instructor ULM",
    description: "Preparación para ser instructor de ultraligeros",
    link: "#",
    icon: "👨‍🏫",
    available: false,
    status: "Próximamente",
  },
  {
    name: "RTC (Radio)",
    description: "Certificado de radiofonía para pilotos ULM",
    link: "#",
    icon: "📡",
    available: false,
    status: "Próximamente",
  },
]

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 flex-grow">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8"
          >
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-200">
              Optimiza tu tiempo de estudio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8"
          >
            Tests de ultraligero
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              licencia ulm
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-xl text-blue-200 mb-12"
          >
            Tests online especializados para la licencia ULM. Normativa {" "}
            <a
              href="https://www.seguridadaerea.gob.es/es/ambitos/formacion-y-examenes/examenes-de-piloto/examenes-teoricos-ulm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              AESA
            </a>
          
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/test-selection">
              <Button
                variant="default"
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Comenzar Tests ULM Gratis
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Ver Demo
            </Button>
          </motion.div>
        </section>

        {/* License Types Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prepara tu licencia ULM Multieje Ala Fija.
            </h2>
            <p className="text-blue-200 text-lg max-w-3xl mx-auto">
              Actualmente ofrecemos preparación completa para la licencia ULM
              multieje ala fija. Estamos trabajando para traerte pronto tests
              para todas las demás modalidades de ultraligero.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {licenseTypes.map((license, index) => (
              <motion.div
                key={license.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                  license.available
                    ? "bg-white/5 backdrop-blur-sm hover:bg-white/10 cursor-pointer group"
                    : "bg-white/[0.02] backdrop-blur-sm opacity-90"
                }`}
              >
                {/* Gradient overlay for available items */}
                {license.available && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                {/* Status indicator and badge aligned to the right */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      license.available
                        ? "bg-green-500/10 text-green-300"
                        : "bg-orange-500/10 text-orange-300"
                    }`}
                  >
                    {license.status}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      license.available
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : "bg-orange-400/60"
                    }`}
                  />
                </div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="text-4xl">{license.icon}</div>
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      license.available ? "text-white" : "text-white/70"
                    }`}
                  >
                    {license.name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${
                      license.available ? "text-blue-200" : "text-blue-200/60"
                    }`}
                  >
                    {license.description}
                  </p>

                  {license.available ? (
                    <Link
                      href={license.link}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                    >
                      Ver tests
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-orange-400/80 text-sm font-medium">
                      En desarrollo...
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por Qué Elegir AeroTestULM para tu Examen ULM?
            </h2>
            <p className="text-blue-200 text-lg max-w-3xl mx-auto">
              Nuestra plataforma utiliza tecnología avanzada e inteligencia
              artificial para ofrecerte la mejor preparación para tu examen de
              piloto de ultraligero.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-blue-200 text-lg mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-semibold">
                    {feature.stat}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mb-24">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Todo sobre el Examen ULM Multieje Ala Fija
              </h2>

              <div className="grid md:grid-cols-2 gap-8 text-blue-200">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Examen Teórico ULM Multieje
                  </h3>
                  <p className="mb-4">
                    Prepárate para el examen oficial{" "}
                    <a
                      href="https://www.seguridadaerea.gob.es/es/ambitos/formacion-y-examenes/examenes-de-piloto/examenes-teoricos-ulm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      AESA
                    </a>{" "}
                    con nuestros tests especializados en multieje ala fija.
                    Cubrimos todas las materias: navegación, meteorología,
                    normativa y factores humanos.
                  </p>
                  <ul className="space-y-2">
                    <li>
                      •{" "}
                      <Link
                        href="/blog/temario-examen-ultraligero"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Temario completo
                      </Link>
                    </li>
                    <li>
                      •{" "}
                      <Link
                        href="/blog/requisitos-examen-ultraligero"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Requisitos oficiales
                      </Link>
                    </li>
                    <li>
                      •{" "}
                      <Link
                        href="/faqs-preguntas-frecuentes"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Preguntas frecuentes
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Próximas Licencias ULM
                  </h3>
                  <p className="mb-4">
                    Ampliamos constantemente nuestra oferta. Pronto tendrás
                    tests para todas las modalidades ULM.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>
                        Multieje ala fija - <strong>Disponible</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-400">🔄</span>
                      <span>
                        Autogiro - <em>Próximamente</em>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-400">🔄</span>
                      <span>
                        Instructor - <em>Próximamente</em>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-orange-400">🔄</span>
                      <span>
                        RTC - <em>Próximamente</em>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Resolvemos las dudas más comunes sobre AeroTestULM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                ¿Es gratis usar AeroTestULM?
              </h3>
              <p className="text-blue-200 text-sm">
                Ofrecemos 200 preguntas gratuitas para que pruebes la
                plataforma. Para acceso completo a todas las funciones y miles
                de preguntas, tenemos planes de suscripción desde 9.99€/mes.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                ¿Qué incluyen los tests ULM multieje?
              </h3>
              <p className="text-blue-200 text-sm">
                Cubrimos todas las materias del examen oficial{" "}
                <a
                  href="https://www.seguridadaerea.gob.es/es/ambitos/formacion-y-examenes/examenes-de-piloto/examenes-teoricos-ulm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  AESA
                </a>
                : navegación, meteorología, derecho aéreo, AGK, rendimiento
                humano y procedimientos operacionales específicos para multieje
                ala fija.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                ¿Cómo funcionan los tests personalizados?
              </h3>
              <p className="text-blue-200 text-sm">
                Nuestra IA analiza tu rendimiento y crea tests enfocados en tus
                áreas de mejora. El sistema se adapta a tu nivel y progreso para
                optimizar tu preparación.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                ¿Puedo cancelar mi suscripción?
              </h3>
              <p className="text-blue-200 text-sm">
                Sí, puedes cancelar en cualquier momento desde tu cuenta.
                Mantendrás acceso hasta el final de tu período actual y
                ofrecemos reembolso completo en los primeros 14 días.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/faqs-preguntas-frecuentes">
              <Button variant="outline" size="lg">
                Ver todas las preguntas frecuentes
              </Button>
            </Link>
          </div>

          {/* JSON-LD for FAQ */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿Es gratis usar AeroTestULM?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Ofrecemos 200 preguntas gratuitas para que pruebes la plataforma. Para acceso completo a todas las funciones y miles de preguntas, tenemos planes de suscripción desde 9.99€/mes.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué incluyen los tests ULM multieje?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Cubrimos todas las materias del examen oficial AESA: navegación, meteorología, derecho aéreo, AGK, rendimiento humano y procedimientos operacionales específicos para multieje ala fija.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Cómo funcionan los tests personalizados?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Nuestra IA analiza tu rendimiento y crea tests enfocados en tus áreas de mejora. El sistema se adapta a tu nivel y progreso para optimizar tu preparación.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Puedo cancelar mi suscripción?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Sí, puedes cancelar en cualquier momento desde tu cuenta. Mantendrás acceso hasta el final de tu período actual y ofrecemos reembolso completo en los primeros 14 días.",
                    },
                  },
                ],
              }),
            }}
          />
        </section>

        {/* CTA Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-1">
            <div className="bg-cosmic-night rounded-2xl p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Users className="h-6 w-6 text-main" />
                    </div>
                    <span className="text-lg text-main font-medium">
                      +10,000 estudiantes confían en nosotros
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-main mb-4">
                    Comienza tu Preparación para el Examen ULM Hoy
                  </h2>
                  <p className="text-secondary text-lg">
                    200 preguntas de práctica gratuitas para empezar tu
                    preparación
                  </p>
                </div>
                <Link href="/test-selection">
                  <Button
                    variant="default"
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="whitespace-nowrap"
                  >
                    Comenzar Tests Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="my-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-main">
              Guías y Recursos para tu Examen ULM
            </h2>
            <Link href="/blog">
              <Button
                variant="ghost"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Ver todas
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-tertiary" />
                      <span className="text-tertiary text-sm">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-main mb-2 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-secondary text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-tertiary text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(post.date).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
