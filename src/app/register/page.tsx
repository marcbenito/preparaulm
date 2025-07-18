"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Shield } from "@/components/ui/icons/Shield"
import { Building2 } from "@/components/ui/icons/Building2"
import { ArrowRight } from "@/components/ui/icons/ArrowRight"
import { Eye } from "@/components/ui/icons/Eye"
import { EyeOff } from "@/components/ui/icons/EyeOff"
import { Loader2 } from "@/components/ui/icons/Loader2"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import {
  RegisterUserUseCase,
  RegisterUserInput,
  RegisterUserResult,
} from "@/domain/use-cases/users/RegisterUser"

// Extend RegisterUserResult type for client-side handling
interface RegisterActionResult extends RegisterUserResult {
  shouldRedirect?: boolean
}

// Server Action for registration
async function registerAction(
  prevState: any,
  formData: FormData,
): Promise<RegisterActionResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password || !name) {
    return { success: false, error: "Name, email, and password are required." }
  }
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." }
  }

  try {
    const supabase = await createClient()
    const registerUseCase = RegisterUserUseCase.create(supabase)
    const result = await registerUseCase.execute({ name, email, password })

    console.log("Registration Result:", result)

    if (result.success) {
      return { success: true, userId: result.userId, shouldRedirect: true }
    } else {
      return { success: false, error: result.error || "Registration failed." }
    }
  } catch (error: any) {
    console.error("Registration Action Error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred.",
    }
  }
}

function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const initialState: RegisterActionResult = { success: false }
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  )

  // Effect to handle redirect based on action state
  useEffect(() => {
    if (state.success && state.shouldRedirect) {
      router.push("/dashboard")
    }
  }, [state, router])

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto">
          {/* Invitation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-1 mb-8"
          >
            <div className="bg-cosmic-night rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Invitación a Prair Aviación
                  </h2>
                  <p className="text-blue-200">
                    <span className="font-medium text-white">Pere Roura</span>{" "}
                    te ha invitado a formar parte de{" "}
                    <span className="font-medium text-white">
                      Prair Aviación
                    </span>
                    . Completa tu registro para acceder a la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-xl mb-3">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Crea tu cuenta
              </h1>
              <p className="text-blue-200">
                Únete a más de 10,000 estudiantes que confían en nosotros
              </p>
            </div>

            <form action={formAction} className="space-y-6">
              <div>
                <Label
                  className="block text-sm font-medium text-blue-200 mb-2"
                  htmlFor="name"
                >
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  variant="themed"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <Label
                  className="block text-sm font-medium text-blue-200 mb-2"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  variant="themed"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <Label
                  className="block text-sm font-medium text-blue-200 mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    variant="themed"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-blue-100"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-blue-300">
                  Mínimo 8 caracteres
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-blue-200">
                  Acepto los{" "}
                  <Link
                    href="/terms"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    política de privacidad
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                aria-disabled={isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-6"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Completando Registro...
                  </>
                ) : (
                  <>
                    Completar Registro
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {state?.error && (
                <p className="text-sm text-red-400 mt-2">{state.error}</p>
              )}

              <div className="text-center text-sm text-blue-200">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-blue-300 hover:text-blue-200 font-medium"
                >
                  Inicia Sesión
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Register
