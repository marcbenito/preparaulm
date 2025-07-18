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
import { Shield } from "@/components/ui/icons/Shield"
import { Eye } from "@/components/ui/icons/Eye"
import { EyeOff } from "@/components/ui/icons/EyeOff"

import { Loader2 } from "@/components/ui/icons/Loader2"

import { useAuthModal } from "@/context/AuthModalContext"
import { registerAction, ActionResult } from "@/app/auth/actions"
import { useRouter } from "next/navigation"

// Validation Schema with Yup
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"), // Added name validation
  email: Yup.string()
    .email("Introduce un email válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  // Add terms acceptance if needed
  // terms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones')
})

export function RegisterModal() {
  const router = useRouter()
  // Get state and actions from context
  const { registerOpen, switchToLogin, closeRegister } = useAuthModal()

  const [showPassword, setShowPassword] = useState(false)

  // Placeholder for server action state (will be added in Phase 3)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleRegisterSubmit = async (
    values: Yup.InferType<typeof RegisterSchema>,
    { setSubmitting }: any,
  ) => {
    setServerError(null)
    setIsPending(true)
    setSubmitting(true)

    try {
      // Now 'values' should correctly include 'name'
      const result: ActionResult = await registerAction({
        email: values.email,
        password: values.password,
        name: values.name, // Use the validated name from form values
      })

      if (result.success) {
        console.log("Registration successful via action!")
        closeRegister() // Close modal on success
        router.push("/dashboard") // Redirect to dashboard
      } else {
        setServerError(result.error || "Error al registrar.")
      }
    } catch (error: any) {
      console.error("Registration submit error:", error)
      setServerError(error.message || "Ocurrió un error inesperado.")
    } finally {
      setIsPending(false)
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={registerOpen} onOpenChange={closeRegister}>
      <DialogContent className="sm:max-w-md bg-cosmic-night border-white/10 text-white h-full md:h-auto flex flex-col p-0">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Crea tu cuenta
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Formik
            initialValues={{ email: "", password: "", name: "" }} // Added name to initial values
            validationSchema={RegisterSchema} // Schema might need updating for name
            onSubmit={handleRegisterSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-xl mb-3">
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-blue-200">
                    Únete a más de 10,000 estudiantes que confían en nosotros
                  </p>
                </div>

                {/* Name Field - Uncomment and adjust if needed */}
                <div className="space-y-2">
                  <Label
                    htmlFor="register-name"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Nombre Completo
                  </Label>
                  <Field
                    as={Input}
                    id="register-name"
                    name="name"
                    type="text"
                    variant="themed"
                    placeholder="Tu nombre completo"
                    error={touched.name && !!errors.name}
                    aria-invalid={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={InputErrorMessage} />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="register-email"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Email
                  </Label>
                  <Field
                    as={Input}
                    id="register-email"
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
                    htmlFor="register-password"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="register-password"
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
                  <p className="mt-1 text-xs text-blue-300">
                    Mínimo 8 caracteres
                  </p>
                </div>

                {/* Add Terms Checkbox if required by design/schema */}
                {/* <div className="flex items-start space-x-2 pt-2"> 
                  <Field
                    as={Checkbox}
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm text-blue-200 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los <a href="/terms" className="text-blue-300 hover:text-blue-200 underline">términos</a> y <a href="/privacy" className="text-blue-300 hover:text-blue-200 underline">política de privacidad</a>.
                    </label>
                     <ErrorMessage name="terms" component={InputErrorMessage} />
                  </div>
                </div> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-6"
                  disabled={isSubmitting || isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creando Cuenta...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>

                {/* Display Server Error */}
                {serverError && <InputErrorMessage message={serverError} />}

                {/* Switch to Login */}
                <div className="text-center text-sm text-blue-200">
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="text-blue-300 hover:text-blue-200 font-medium underline"
                    disabled={isSubmitting || isPending}
                  >
                    Inicia Sesión
                  </button>
                </div>

                {/* Terms Text (if checkbox not used) */}
                <div className="text-xs text-blue-200 text-center">
                  Al registrarte, aceptas nuestros{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    términos y condiciones
                  </a>{" "}
                  y nuestra{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    política de privacidad
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  )
}
