import { StorageError } from "@supabase/storage-js"
import { SupabaseClient } from "@supabase/supabase-js"
import { UserRepository } from "@/domain/repositories/UserRepository"

export interface UploadAvatarUseCaseParams {
  file: File
  userId: string
}

export interface UploadAvatarUseCaseResult {
  avatarUrl?: string
  error?: string
}

export class UploadAvatarUseCase {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  constructor(
    private supabaseClient: SupabaseClient,
    private userRepository: UserRepository
  ) {}

  async execute(params: UploadAvatarUseCaseParams): Promise<UploadAvatarUseCaseResult> {
    const { file, userId } = params

    try {
      // Validate file size (max 5MB)
      if (file.size > this.MAX_FILE_SIZE) {
        return {
          error: "La imagen no puede exceder los 5MB"
        }
      }

      // Generate unique file name
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage with public access
      const { error: uploadError } = await this.supabaseClient.storage
        .from("user-photos")
        .upload(filePath, file, {
          upsert: true,
          cacheControl: "3600"
        })

      if (uploadError) {
        console.error("Upload error:", uploadError)
        
        // Check if it's an authorization error
        if (uploadError.message && 
           (uploadError.message.includes("403") || 
            uploadError.message.includes("security policy") || 
            uploadError.message.includes("Unauthorized"))) {
          return {
            error: "No tiene permisos para subir archivos. Por favor contacte al administrador."
          }
        }
        
        return {
          error: "Error al subir el archivo. Inténtalo de nuevo."
        }
      }

      // Get public URL
      const { data: publicUrlData } = this.supabaseClient.storage
        .from("user-photos")
        .getPublicUrl(filePath)

      if (!publicUrlData?.publicUrl) {
        return {
          error: "No se pudo obtener la URL pública"
        }
      }

      // Update the user profile with the new avatar URL
      const success = await this.userRepository.updateAvatarUrl(userId, publicUrlData.publicUrl)
      
      if (!success) {
        return {
          error: "Se subió la imagen pero no se pudo actualizar tu perfil."
        }
      }

      return {
        avatarUrl: publicUrlData.publicUrl
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      
      // Check if it's an error object with status code
      if (error && typeof error === 'object' && 'statusCode' in error) {
        const err = error as any
        if (err.statusCode === 403) {
          return {
            error: "No tiene permisos para subir archivos. Por favor contacte al administrador."
          }
        }
      }
      
      return {
        error: "Error inesperado al subir el avatar. Inténtalo de nuevo."
      }
    }
  }
  static create(supabaseClient: SupabaseClient): UploadAvatarUseCase {
    const userRepository = UserRepository.create(supabaseClient)
    const uploadAvatarUseCase = new UploadAvatarUseCase(supabaseClient, userRepository)
    return uploadAvatarUseCase
  }
} 