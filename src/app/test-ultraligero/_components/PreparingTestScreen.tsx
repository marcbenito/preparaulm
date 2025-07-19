"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import {
  AlertCircle,
  RefreshCcw,
  Brain,
  Target,
  Sparkles,
} from "@/components/ui/icons"

interface PreparingTestScreenProps {
  onRetry: () => void
  testType: "generic" | "category"
  categoryName?: string
  errorMessage?: string | null
}

export default function PreparingTestScreen({
  onRetry,
  testType,
  categoryName,
  errorMessage,
}: PreparingTestScreenProps) {
  const hasError = !!errorMessage

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-500/20">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>

              <Alert variant="destructive" className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {errorMessage}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <p className="text-white text-lg text-center">
                  No pudimos preparar tu test
                </p>

                <Button
                  onClick={onRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Intentar de nuevo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 right-0 text-blue-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Brain className="h-32 w-32" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 text-purple-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Target className="h-24 w-24" />
          </motion.div>

          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-6 w-6 text-blue-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white">
              Preparando tu test...
            </h1>
          </div>

          <motion.div className="h-1 bg-blue-500/20 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div
            className="space-y-6 text-blue-200"
            aria-live="polite"
            role="status"
          >
            <p className="text-lg">
              Estamos generando tu test con ayuda de inteligencia artificial.
              Las preguntas se seleccionan estratégicamente para conocerte
              mejor, identificar tus puntos fuertes y detectar las áreas que
              necesitas reforzar.
            </p>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">
                Cuanto más usas PreparaUlm, más afinamos el contenido para ti:
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  buscamos que cada test te aporte información útil
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  un feedback más preciso
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  te ayude a progresar más rápido
                </li>
              </ul>
            </div>

            <p>
              En unos segundos tendrás tu test listo, totalmente adaptado a ti.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
