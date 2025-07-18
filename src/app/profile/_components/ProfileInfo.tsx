import { User } from "@/domain/entities/User"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { User as IconUser, Loader2 } from "@/components/ui/icons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { UserProfileResponse } from "@/domain/use-cases/users/GetUserProfile"

interface ProfileInfoProps {
  profile: UserProfileResponse | null
  form: any
  isUpdatingProfile: boolean
  onSubmit: (data: { name: string; phone: string }) => void
}

export function ProfileInfo({
  profile,
  form,
  isUpdatingProfile,
  onSubmit,
}: ProfileInfoProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <IconUser className="h-5 w-5 text-blue-400" />
        Información Personal
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-200">Nombre</FormLabel>
                <FormControl>
                  <Input {...field} variant="themed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-blue-200">Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} variant="themed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-blue-200">Email</FormLabel>
            <Input
              type="email"
              value={profile?.email || ""}
              disabled
              variant="themed"
              className="cursor-not-allowed"
            />
            <p className="mt-2 text-sm text-blue-300">
              El email no se puede modificar
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
