"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { Subscription } from "@/domain/entities/Subscription"
import { Skeleton } from "@/components/ui/Skeleton"
import { Button } from "@/components/ui/Button"
import { Camera, AlertTriangle } from "@/components/ui/icons"
import { useToast } from "@/hooks/useToast"
import { ProfileInfo } from "./_components/ProfileInfo"
import { SubscriptionInfo } from "./_components/SubscriptionInfo"
import { PasswordChange } from "./_components/PasswordChange"
import { UploadAvatarUseCase } from "@/domain/use-cases/users/UploadAvatar"
import { createClient } from "@/utils/supabase/client"
import { GetUserSubscriptionUseCase } from "@/domain/use-cases/subscriptions/GetUserSubscription"
import {
  GetUserProfileUseCase,
  UserProfileResponse,
} from "@/domain/use-cases/users/GetUserProfile"
import { UpdateUserProfileUseCase } from "@/domain/use-cases/users/UpdateUserProfile"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const supabaseClient = createClient()
  const { toast } = useToast()

  // Form for profile info
  const profileForm = useForm<{
    name: string
    phone: string
  }>({
    defaultValues: {
      name: "",
      phone: "",
    },
  })

  useEffect(() => {
    async function loadUserData() {
      try {
        setIsLoading(true)

        // Load base user data from Auth (just email and id)
        const getUserProfileUseCase =
          GetUserProfileUseCase.create(supabaseClient)

        const userData = await getUserProfileUseCase.execute()

        if (userData?.user) {
          // Get all profile data from UserRepository

          setProfile(userData.user)

          profileForm.reset({
            name: userData.user.name || "",
            phone: userData.user.phone || "",
          })
        }

        // Load subscription data
        try {
          const supabaseClient = createClient()
          const getUserSubscriptionUseCase =
            GetUserSubscriptionUseCase.create(supabaseClient)
          const subscriptionData = await getUserSubscriptionUseCase.execute()

          if (subscriptionData) {
            setSubscription(subscriptionData)
          } else {
            // Si no hay suscripción, establecer el estado como "Free"
            setSubscription({
              id: "free-plan",
              user_id: userData?.user?.id || "unknown",
              plan_id: "free",
              status: "active",
              current_period_start: new Date().toISOString(),
              current_period_end: "", // No hay fecha de expiración para el plan free
              cancel_at_period_end: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } as any)
          }
        } catch (error) {
          console.error("Error loading subscription:", error)
          // En caso de error, también establecer un plan Free
          setSubscription({
            id: "free-plan",
            user_id: userData?.user?.id || "unknown",
            plan_id: "free",
            status: "active",
            current_period_start: new Date().toISOString(),
            current_period_end: "", // No hay fecha de expiración
            cancel_at_period_end: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as any)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo cargar el perfil. Inténtalo de nuevo.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [profileForm, toast])

  const handleProfileUpdate = async (data: { name: string; phone: string }) => {
    if (!profile) return

    try {
      setIsUpdatingProfile(true)
      const supabaseClient = createClient()
      const updateUserProfileUseCase =
        UpdateUserProfileUseCase.create(supabaseClient)

      const result = await updateUserProfileUseCase.execute({
        name: data.name,
        phone: data.phone,
        avatarUrl: profile.avatarUrl || "",
      })

      if (result) {
        setProfile({
          ...profile,
          name: result.name || "",
          phone: result.phone || "",
          avatarUrl: result.avatarUrl || null,
        })
        toast({
          title: "Perfil actualizado",
          description: "Tu información ha sido actualizada correctamente",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    try {
      setIsUploadingAvatar(true)

      // Use the upload avatar use case
      const supabaseClient = createClient()
      const uploadAvatar = UploadAvatarUseCase.create(supabaseClient)
      const result = await uploadAvatar.execute({
        file,
        userId: profile.id,
      })

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        })
        return
      }

      if (result.avatarUrl) {
        // Update profile state directly since UserRepository has already been updated
        setProfile({
          ...profile,
          avatarUrl: result.avatarUrl + `?t=${Date.now()}`, // Add cache-busting
        })

        toast({
          title: "Avatar actualizado",
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
      setIsUploadingAvatar(false)
    }
  }

  const handleDeleteAccount = async () => {
    // This would typically show a confirmation dialog first
    toast({
      title: "Acción no disponible",
      description:
        "La eliminación de cuenta está deshabilitada en este momento",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-night">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cosmic-night">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white mb-8">Mi Perfil</h1>

          {/* Foto de Perfil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center"
          >
            <div className="relative inline-block w-32 h-32 mx-auto mb-6">
              <Image
                src={
                  profile?.avatarUrl
                    ? profile.avatarUrl
                    : "/images/pilot-avatar.jpg"
                }
                alt="Foto de perfil"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                key={profile?.avatarUrl}
                priority
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                {isUploadingAvatar ? (
                  <span className="flex items-center justify-center w-5 h-5">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  <Camera className="h-5 w-5 text-white" />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isUploadingAvatar}
                />
              </label>
            </div>
            <p className="text-blue-200 text-sm">JPG, GIF o PNG. Máximo 5MB</p>
          </motion.div>

          {/* Información Personal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProfileInfo
              profile={profile}
              form={profileForm}
              isUpdatingProfile={isUpdatingProfile}
              onSubmit={handleProfileUpdate}
            />
          </motion.div>

          {/* Información de Suscripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SubscriptionInfo subscription={subscription} />
          </motion.div>

          {/* Cambiar Contraseña */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PasswordChange />
          </motion.div>

          {/* Darse de Baja */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h2 className="text-xl font-semibold text-white">
                Darse de Baja
              </h2>
            </div>

            <p className="text-blue-200 mb-6">
              Al darte de baja, perderás acceso a todos los servicios y tu
              información será eliminada permanentemente.
            </p>

            <Button
              variant="destructive"
              className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
              onClick={handleDeleteAccount}
            >
              Eliminar Cuenta
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
