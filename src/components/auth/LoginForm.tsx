import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import { Loader2, GoogleIcon } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { useToast } from "@/hooks/useToast"
import { createClient } from "@/utils/supabase/client"
import { LoginUserUseCase } from "@/domain/use-cases/users/LoginUser"
import { datadogRum } from "@datadog/browser-rum"

const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce un email válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
  showRedirectLink?: boolean
}

export function LoginForm({
  onSuccess,
  redirectTo = "/dashboard",
  showRedirectLink = true,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)
      setError(null)
      

      
      const subapase = createClient()
      const loginUserUseCase = LoginUserUseCase.create(subapase)

      const result = await loginUserUseCase.execute({
        email: data.email,
        password: data.password,
      })

      if (result.success) {
        // Trackear login exitoso
        datadogRum.addAction('login_success', {})
        
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        })

        if (onSuccess) {
          onSuccess()
        } else {
          window.location.href = redirectTo
        }

        form.reset()
      } else {
        // Trackear error de login
        datadogRum.addAction('login_error', { 
          error: result.error || 'Credenciales incorrectas'
        })
        
        setError(
          result.error ||
            "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        )
      }
    } catch (err) {
      // Trackear error de login
      datadogRum.addAction('login_error', { 
        error: err instanceof Error ? err.message : 'Error al iniciar sesión'
      })
      
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      toast({
        title: "Función en desarrollo",
        description:
          "El inicio de sesión con Google estará disponible próximamente",
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al iniciar sesión con Google",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-blue-200">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    variant="themed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-blue-200">
                  Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    variant="themed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button
              variant="link"
              className="text-sm text-blue-300 hover:text-blue-200 p-0"
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1a1c29] text-blue-200">
                O continúa con
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-white/20 text-white hover:bg-white/10"
            disabled={isLoading}
          >
            <GoogleIcon className="mr-2" />
            Google
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
