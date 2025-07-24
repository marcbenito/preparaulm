"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
  ArrowRight,
  CheckCircle2,
  UserCheck,
  BarChart3,
  BookmarkCheck,
  Users,
  Trophy,
} from "@/components/ui/icons"
import Link from "next/link"

const phases = [
  {
    number: 1,
    title: "Conoce tu nivel",
    color: "from-green-500 to-emerald-500",
    details: [
      "Realiza tus primeros test (unas 50 preguntas, aprox. 5 test)",
      "La IA necesita esta información para conocer tu nivel inicial",
    ],
  },
  {
    number: 2,
    title: "Entrena con IA",
    color: "from-yellow-500 to-orange-500",
    details: [
      "Una vez tiene suficiente contexto, la IA comienza a evaluarte",
      "Cada nuevo test se genera automáticamente y a medida, según tus respuestas anteriores",
      "Los tests están clasificados por niveles: empiezas en el nivel básico",
      "A medida que aciertas más, la IA te sube de nivel progresivamente",
      "Tras cada test, recibirás un informe personalizado con:",
      "• Tus errores",
      "• Los conceptos que necesitas reforzar",
      "• Tus progresos y evolución",
      "Además, la IA te muestra la confianza que tiene en cada materia, indicando tu probabilidad de aprobado",
    ],
  },
  {
    number: 3,
    title: "Preséntate al examen",
    color: "from-green-500 to-emerald-500",
    details: [
      "Llegados aquí, tu preparación está basada en datos reales y objetivos",
      "Has practicado con tests hechos a medida y te has enfocado en lo que realmente importa",
      "La IA te ha guiado paso a paso con recomendaciones claras y personalizadas",
      "Ya no solo sabes responder, sabes cómo enfrentarte al examen",
    ],
  },
]

const additionalFeatures = [
  {
    icon: BookmarkCheck,
    title: "Marca preguntas para revisar",
    details: [
      "Puedes marcar cualquier pregunta, incluso si la respondes bien",
      "Ideal para dudas, repasos o para consultarlas después",
      "Puedes revisarlas tú mismo o comentarlas con tu instructor",
    ],
  },
  {
    icon: Users,
    title: "Vincula tu cuenta con tu instructor",
    details: [
      "Si formas parte de una escuela, puedes dar acceso a tu instructor",
      "Tendrá acceso a tus test y podrá seguir tu progreso en tiempo real",
      "Si no te ha creado él la cuenta, puedes invitarlo fácilmente desde tu perfil",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-main mb-6"
        >
                      ¿Cómo funciona PreparaUlm?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-secondary"
        >
          Nuestra inteligencia artificial te guía paso a paso hacia el éxito
        </motion.p>
      </div>

      <div className="mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="relative mx-auto mb-4 w-24 h-24"
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} blur-lg opacity-40 scale-110`}
                    />

                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent p-0.5">
                      <div className="w-full h-full rounded-full bg-cosmic-night/80 backdrop-blur-sm" />
                    </div>

                    {/* Inner circle with gradient */}
                    <div
                      className={`absolute inset-2 rounded-full bg-gradient-to-br ${phase.color} shadow-2xl flex items-center justify-center`}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                      <motion.span
                        className="relative text-white font-bold text-2xl drop-shadow-lg"
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 8px rgba(255,255,255,0.3)",
                            "0 0 0px rgba(255,255,255,0)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        {phase.number}
                      </motion.span>
                    </div>

                    {/* Floating particles */}
                    {[...Array(3)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                        style={{
                          top: `${20 + particleIndex * 20}%`,
                          left: `${10 + particleIndex * 30}%`,
                        }}
                        animate={{
                          y: [-2, 2, -2],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2 + particleIndex * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: particleIndex * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-main">
                    {phase.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {phase.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2">
                      {detail.startsWith("•") ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 ml-4 flex-shrink-0" />
                          <p className="text-secondary text-sm">
                            {detail.substring(2)}
                          </p>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-secondary text-sm">{detail}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-md opacity-30 scale-125" />

                    <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-md">
                      <motion.div
                        animate={{
                          x: [0, 3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="h-6 w-6 text-white drop-shadow-md" />
                      </motion.div>
                    </div>

                    <div className="absolute top-1/2 left-full transform -translate-y-1/2 flex gap-0.5 ml-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1 h-1 bg-blue-400 rounded-full"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: dot * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-1 mb-16"
      >
        <div className="bg-cosmic-night rounded-2xl p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-main mb-4">
              ¡Estás preparado!
            </h2>
            <p className="text-secondary text-lg mb-6">
              Con PreparaULM has estudiado con inteligencia, enfocado tu esfuerzo
              y ganado confianza.
              <br />
              Ahora solo queda dar el paso. ¡Preséntate al examen con ventaja!
            </p>
            <Link href="/test-ultraligero">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 py-4 rounded-xl"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Comenzar mi Preparación
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="text-2xl font-bold text-main text-center mb-8"
        >
          Otras opciones útiles
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-main mb-3">
                    {feature.title}
                  </h3>
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-secondary text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-main">Sobre la plataforma</h2>
        </div>

        <div className="space-y-3 text-secondary">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              La IA analiza continuamente tus resultados para recomendarte qué
              materias estudiar
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Estas recomendaciones están basadas en las categorías y
              subcategorías oficiales de AESA
            </p>
          </div>
          <div className="ml-6 space-y-2">
            <p className="font-medium text-main text-sm">
              Por cada sección puedes ver:
            </p>
            <div className="space-y-1 ml-4">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 flex-shrink-0" />
                <p className="text-sm">Tu nivel de dominio actual</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 flex-shrink-0" />
                <p className="text-sm">
                  La confianza de la IA en tu posible aprobado
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 flex-shrink-0" />
                <p className="text-sm">
                  La importancia relativa de ese tema en el examen
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Todo esto lo encontrarás claramente en el Dashboard y en la
              sección de Pruebas Prácticas
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
