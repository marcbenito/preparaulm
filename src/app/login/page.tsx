"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { Button } from "@/components/ui/Button"
import { Shield, CheckCircle2, ArrowRight, Mail } from "@/components/ui/icons"
import { use } from "react"

const benefits = [
  {
    title: "Seguimiento Personalizado",
    description:
      "Analiza tu progreso y mejora tu rendimiento con estadísticas detalladas",
    icon: CheckCircle2,
  },
  {
    title: "Contenido Premium",
    description: "Accede a más de 5000 preguntas y exámenes actualizados",
    icon: Shield,
  },
  {
    title: "Soporte Prioritario",
    description: "Recibe ayuda personalizada de nuestro equipo de instructores",
    icon: Mail,
  },
]

export default function LoginPage({ params }: { params: any }) {
  const searchParams = use(params) as { redirectTo: string }
  const redirectTo = searchParams.redirectTo || "/dashboard"

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Login Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 order-2 md:order-1"
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-blue-200 mb-8">
              Continúa tu preparación para convertirte en piloto
            </p>

            <LoginForm redirectTo={redirectTo} />
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="order-1 md:order-2"
        >
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Aún no tienes cuenta?
            </h2>
            <p className="text-xl text-blue-200">
              Únete a más de 10,000 estudiantes que confían en nosotros
            </p>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-blue-200">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:text-left">
            <Link href="/register">
              <Button
                variant="primary-gradient"
                size="lg"
                className="px-8 py-6 rounded-xl"
              >
                Crear Cuenta Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
