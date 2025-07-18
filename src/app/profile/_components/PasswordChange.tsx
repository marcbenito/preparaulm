import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useToast } from "@/hooks/useToast"
import { LockKeyhole as Lock, Loader2 } from "@/components/ui/icons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { createClient } from "@/utils/supabase/client"
import { ChangePasswordUseCase } from "@/domain/use-cases/users/ChangePassword"

// Schema for password change form
const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    newPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordSchema>

export function PasswordChange() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const { toast } = useToast()

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const handlePasswordChange = async (data: PasswordFormValues) => {
    try {
      setIsChangingPassword(true)
      const supabaseClient = createClient()
      const changePasswordUseCase = ChangePasswordUseCase.create(supabaseClient)
      const result = await changePasswordUseCase.execute({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      if (result.success) {
        toast({
          title: "Contraseña actualizada",
          description: "Tu contraseña ha sido cambiada correctamente",
        })
        passwordForm.reset()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Error al cambiar la contraseña",
        })
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cambiar la contraseña. Inténtalo de nuevo.",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Lock className="h-5 w-5 text-purple-400" />
        Cambiar Contraseña
      </h2>

      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
          className="space-y-6"
        >
          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-200">
                  Contraseña Actual
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} variant="themed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-200">
                  Nueva Contraseña
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} variant="themed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={passwordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-200">
                  Confirmar Nueva Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    variant="themed"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        passwordForm.handleSubmit(handlePasswordChange)()
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Actualizando...
              </>
            ) : (
              "Actualizar Contraseña"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
