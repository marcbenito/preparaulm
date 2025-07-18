"use client"

import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { InputErrorMessage } from "@/components/ui/Form"
import { Github } from "@/components/ui/icons/Github"
import { Linkedin } from "@/components/ui/icons/Linkedin"
import { UserPlus } from "@/components/ui/icons/UserPlus"
import { ArrowRight } from "@/components/ui/icons/ArrowRight"
import { Eye } from "@/components/ui/icons/Eye"
import { EyeOff } from "@/components/ui/icons/EyeOff"
import { Loader2 } from "@/components/ui/icons/Loader2"
import { useRouter } from "next/navigation"

import { createClient } from "@/utils/supabase/client"
import { LoginUserUseCase } from "@/domain/use-cases/users/LoginUser"
import { useAuthModal } from "@/context/AuthModalContext"

// Validation Schema with Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
})

export function LoginModal() {
  const router = useRouter()
  // Get state and actions from context
  const {
    loginOpen,
    switchToRegister,
    closeLogin,
    openForgotPassword,
    onLoginSuccess,
  } = useAuthModal()

  const [showPassword, setShowPassword] = useState(false)
  // Remove basic useState for email, password, touched - Formik handles this
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // })

  // Placeholder for server action state (will be added in Phase 3)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleLoginSubmit = async (
    values: Yup.InferType<typeof LoginSchema>,
    { setSubmitting }: any,
  ) => {
    setServerError(null)
    setIsPending(true)
    setSubmitting(true)

    try {
      const supabase = createClient()
      const loginUserUseCase = LoginUserUseCase.create(supabase)
      const result = await loginUserUseCase.execute({
        email: values.email,
        password: values.password,
      })

      if (result.success) {
        console.log("Login successful via action!")
        closeLogin() // Close modal on success

        // Execute callback if provided, otherwise redirect to dashboard
        if (onLoginSuccess) {
          onLoginSuccess()
        } else {
          router.push("/dashboard") // Redirect to dashboard
        }
      } else {
        setServerError(result.error || "Error al iniciar sesión.")
      }
    } catch (error: any) {
      console.error("Login submit error:", error)
      setServerError(error.message || "Ocurrió un error inesperado.")
    } finally {
      setIsPending(false)
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={loginOpen} onOpenChange={closeLogin}>
      <DialogContent className="sm:max-w-md bg-cosmic-night border-white/10 text-white h-full md:h-auto flex flex-col p-0">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Bienvenido
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Registration CTA */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-1">
                  <div className="bg-cosmic-night rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-lg text-white font-medium mb-2">
                        ¿No tienes cuenta todavía?
                      </p>
                      <p className="text-blue-200 text-sm mb-4">
                        Únete a más de 10,000 estudiantes que confían en
                        nosotros
                      </p>
                      <Button
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                        onClick={switchToRegister} // Use context action
                        disabled={isSubmitting || isPending} // Disable during submission
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Crear Cuenta Gratis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    {/* Adjusted background for text visibility */}
                    <span className="px-2 bg-cosmic-night text-blue-200">
                      O inicia sesión
                    </span>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Email
                  </Label>
                  <Field
                    as={Input}
                    id="login-email"
                    type="email"
                    name="email"
                    variant="themed"
                    placeholder="tu@email.com"
                    error={touched.email && !!errors.email}
                    aria-invalid={touched.email && !!errors.email}
                  />
                  <ErrorMessage name="email" component={InputErrorMessage} />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      variant="themed"
                      placeholder="••••••••"
                      error={touched.password && !!errors.password}
                      aria-invalid={touched.password && !!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-blue-100"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component={InputErrorMessage} />
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={openForgotPassword}
                    className="text-sm text-blue-300 hover:text-blue-200 underline"
                    disabled={isSubmitting || isPending}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-6"
                  disabled={isSubmitting || isPending} // Use Formik's isSubmitting and our pending state
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Iniciando Sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>

                {/* Display Server Error */}
                {serverError && <InputErrorMessage message={serverError} />}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    {/* Adjusted background for text visibility */}
                    <span className="px-2 bg-cosmic-night text-blue-200">
                      O continúa con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/5 border-white/10 text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
                    // onClick={() => { /* OAuth GitHub */ }}
                    disabled // Placeholder: disabled
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/5 border-white/10 text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
                    // onClick={() => { /* OAuth LinkedIn */ }}
                    disabled // Placeholder: disabled
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  )
}
