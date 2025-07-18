"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User } from "@/domain/entities/User"
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
import { Loader2, Save } from "@/components/ui/icons"
import { useToast } from "@/hooks/useToast"

interface ProfileProps {
  name: string
  email: string
  phone: string
}

interface ProfileFormProps {
  profile: ProfileProps
  onProfileUpdate: (updatedProfile: ProfileProps) => Promise<void>
}

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  email: z
    .string()
    .email({
      message: "Por favor, introduce un email válido",
    })
    .optional(),
  phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm({
  profile,
  onProfileUpdate,
}: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    if (!profile) return

    try {
      setIsSubmitting(true)
      await onProfileUpdate({
        ...profile,
        name: data.name,
        phone: data.phone || "",
      })

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados correctamente",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" disabled {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-muted-foreground">
                El email no se puede cambiar directamente.
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Tu número de teléfono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar cambios
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
