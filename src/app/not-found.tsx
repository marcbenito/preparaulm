"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Plane, AlertTriangle } from "@/components/ui/icons"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="relative inline-flex items-center justify-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-full">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-full">
                  <Plane className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¡Oops! Página no encontrada
            </h2>
            <p className="text-xl text-blue-200 mb-2">
              Parece que el rumbo se ha perdido en las nubes.
            </p>
            <p className="text-lg text-blue-300">
              La página que buscas no existe o ha sido movida a otro hangar.
            </p>
          </motion.div>

          {/* Error Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              ¿Qué puedes hacer?
            </h3>
            <div className="space-y-2 text-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Verifica que la URL esté escrita correctamente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Regresa a la página principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Explora nuestros tests de preparación ULM</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button
                variant="primary-gradient"
                size="lg"
                className="px-8 py-6 rounded-xl"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver al Inicio
              </Button>
            </Link>
            <Link href="/test-categories">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
              >
                Explorar Tests
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
