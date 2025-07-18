"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Upload, Camera, Loader2 } from "@/components/ui/icons"
import { useToast } from "@/hooks/useToast"
import { createClient } from "@/utils/supabase/client"
import { UploadProfilePhoto } from "@/domain/use-cases/users/UploadProfilePhoto"

interface ProfileProps {
  id: string
  email: string
  phone: string
  avatarUrl: string
  name: string
}

interface ProfileHeaderProps {
  profile: ProfileProps
  onAvatarUpdate: (avatarUrl: string) => Promise<void>
}

const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
}

export default function ProfileHeader({
  profile,
  onAvatarUpdate,
}: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const supabaseClient = createClient()
  const uploadProfilePhoto = UploadProfilePhoto.create(supabaseClient)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      if (!profile?.id) {
        throw new Error("ID de usuario no disponible")
      }

      // Usar el caso de uso para subir la foto de perfil
      const result = await uploadProfilePhoto.execute({
        file,
        userId: profile.id,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.publicUrl) {
        await onAvatarUpdate(result.publicUrl)
        toast({
          title: "Perfil actualizado",
          description: "Tu foto de perfil ha sido actualizada",
        })
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo subir la imagen. Inténtalo de nuevo.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center md:flex-row md:gap-8">
          <div className="relative mb-6 md:mb-0">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={profile?.avatarUrl || ""}
                alt={profile?.name || "Usuario"}
              />
              <AvatarFallback className="text-3xl">
                {profile?.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <Camera className="h-5 w-5" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{profile?.name || "Usuario"}</h1>
            <p className="text-muted-foreground">
              {profile?.email || "Sin email"}
            </p>
            {profile?.phone && (
              <p className="text-muted-foreground">{profile.phone}</p>
            )}
            <div className="mt-4 flex justify-center md:justify-start">
              <label className="inline-flex cursor-pointer items-center">
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Cambiar foto
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </Button>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
