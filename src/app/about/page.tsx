"use client"

import React from "react"

import { motion } from "framer-motion"
import Image from "next/image"

import { Github, Linkedin, ExternalLink, Mail } from "@/components/ui/icons"
import { Button } from "@/components/ui/Button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About PreparaUlm
            </h1>
            <p className="text-xl text-blue-200">
              A modern platform for aviation test preparation
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 overflow-hidden">
                <Image
                  src="/public/images/pilot-avatar.jpg"
                  alt="Marc Benito"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Marc Benito
              </h2>
              <p className="text-blue-200 mb-6">Creator & Lead Developer</p>

              <div className="text-lg text-blue-100 mb-8 space-y-4 text-left max-w-2xl">
                <p>¡Hola! Soy Marc Benito, el creador de PreparaUlm.</p>
                <p>
                  Soy desarrollador de software desde hace muchos años, pero
                  también un apasionado de la aviación. Siempre he creído que la
                  tecnología puede hacer que volar sea más accesible, seguro y
                                      entretenido. Por eso decidí crear PreparaUlm: una plataforma
                  donde combino mi experiencia en desarrollo con mi amor por los
                  aviones, para ofrecer herramientas útiles a pilotos,
                  estudiantes y entusiastas del vuelo.
                </p>
                <p>
                  PreparaUlm nace con la idea de compartir lo que sé y seguir
                  aprendiendo junto a la comunidad aeronáutica. Si te gusta
                  volar o estás en proceso de aprender, espero que aquí
                  encuentres algo que te ayude o te inspire.
                </p>
                <p>¡Bienvenido a bordo! ✈️</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
                <a
                  href="https://www.marcbenito.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Website
                  </Button>
                </a>
                <a
                  href="https://github.com/marcbenito"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://linkedin.com/in/marcbenito"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                                  <a href="mailto:contacto@preparaulm.com">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    contacto@preparaulm.com
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
