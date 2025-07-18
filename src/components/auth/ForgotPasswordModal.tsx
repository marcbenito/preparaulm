"use client"

import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { InputErrorMessage } from "@/components/ui/Form"
import { Loader2 } from "@/components/ui/icons/Loader2"
import { Mail } from "@/components/ui/icons/Mail"
import { useAuthModal } from "@/context/AuthModalContext"
import { requestPasswordResetAction, ActionResult } from "@/app/auth/actions"
import { RequestPasswordResetParams } from "@/domain/use-cases/users/RequestPasswordReset"

// Validation Schema
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Introduce un email válido")
    .required("El email es obligatorio"),
})

export function ForgotPasswordModal() {
  const { forgotPasswordOpen, closeForgotPassword } = useAuthModal()
  const [formMessage, setFormMessage] = useState<string | null>(null) // For success/error messages
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (
    values: Yup.InferType<typeof ForgotPasswordSchema>,
    { setSubmitting, resetForm }: any,
  ) => {
    setFormMessage(null)
    setIsSuccess(false)
    setIsPending(true)
    setSubmitting(true)

    try {
      const input: RequestPasswordResetParams = {
        email: values.email,
      }
      const result: ActionResult = await requestPasswordResetAction(input)

      if (result.success) {
        setIsSuccess(true)
        setFormMessage(
          "Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.",
        )
        resetForm()
      } else {
        setIsSuccess(false)
        setFormMessage(
          result.error || "Error al solicitar el restablecimiento.",
        )
      }
    } catch (error: any) {
      console.error("Forgot password submit error:", error)
      setIsSuccess(false)
      setFormMessage(error.message || "Ocurrió un error inesperado.")
    } finally {
      setIsPending(false)
      setSubmitting(false)
    }
  }

  // Reset form state when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Delay reset slightly to allow close animation
      setTimeout(() => {
        setFormMessage(null)
        setIsSuccess(false)
        setIsPending(false)
        // Formik reset happens via its own mechanism if needed,
        // but clearing messages/state here is good practice
      }, 300)
      closeForgotPassword() // Call context close function
    }
    // If opening, the context handles the state
  }

  return (
    <Dialog open={forgotPasswordOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-cosmic-night border-white/10 text-white h-full md:h-auto flex flex-col p-0">
        <DialogHeader className="pt-6 text-center px-6">
          <DialogTitle className="text-2xl font-bold mb-2">
            Restablecer Contraseña
          </DialogTitle>
          <DialogDescription className="text-blue-200">
            Introduce tu email y te enviaremos un enlace para crear una nueva
            contraseña.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Email
                  </Label>
                  <Field
                    as={Input}
                    id="forgot-email"
                    type="email"
                    name="email"
                    variant="themed"
                    placeholder="tu@email.com"
                    error={touched.email && !!errors.email}
                    aria-invalid={touched.email && !!errors.email}
                    disabled={isPending || isSuccess} // Disable field after success
                  />
                  <ErrorMessage name="email" component={InputErrorMessage} />
                </div>

                {/* Display Success/Error Message */}
                {formMessage && (
                  <div
                    className={`mt-4 text-sm ${
                      isSuccess ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3" // Slightly smaller padding
                  disabled={isSubmitting || isPending || isSuccess} // Disable button on pending/success
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" /> {/* Added Mail icon */}
                      Enviar Enlace de Restablecimiento
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <DialogFooter className="sm:justify-center mt-4 p-6 pt-0">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="text-blue-200 hover:text-white"
              disabled={isPending} // Disable close if pending?
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
