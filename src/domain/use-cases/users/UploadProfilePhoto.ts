import { SupabaseClient } from "@supabase/supabase-js"
import { StorageService, SupabaseStorageService } from "@/domain/services/StorageService"
import { UserRepository } from "@/domain/repositories/UserRepository"

export interface UploadProfilePhotoParams {
  file: File
  userId: string
}

export interface UploadProfilePhotoResult {
  publicUrl?: string
  error?: string
}

export class UploadProfilePhoto {
  private readonly FILE_CONSTRAINTS = {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"]
  }

  constructor(
    private readonly storageService: StorageService,
    private readonly userRepository: UserRepository
  ) {}

  // Método estático para crear una instancia del caso de uso
  static create(supabaseClient: SupabaseClient): UploadProfilePhoto {
    const storageService = new SupabaseStorageService(supabaseClient)
    const userRepository = new UserRepository(supabaseClient)
    return new UploadProfilePhoto(storageService, userRepository)
  }

  async execute(params: UploadProfilePhotoParams): Promise<UploadProfilePhotoResult> {
    const { file, userId } = params

    try {
      // Subir la imagen usando el StorageService
      const uploadResult = await this.storageService.uploadImage({
        file,
        bucketName: "user-photos",
        folderPath: "user-avatars",
        userId,
        fileConstraints: this.FILE_CONSTRAINTS
      })

      // Si hay un error en la subida, retornarlo
      if (uploadResult.error || !uploadResult.publicUrl) {
        return {
          error: uploadResult.error || "No se pudo obtener la URL de la imagen"
        }
      }

      // Actualizar la URL del avatar en el perfil del usuario
      const updateSuccess = await this.userRepository.updateAvatarUrl(
        userId, 
        uploadResult.publicUrl
      )

      if (!updateSuccess) {
        return {
          error: "Se subió la imagen pero no se pudo actualizar el perfil"
        }
      }

      // Retornar la URL pública
      return {
        publicUrl: uploadResult.publicUrl
      }
    } catch (error) {
      console.error("Error en UploadProfilePhoto:", error)
      return {
        error: "Error inesperado al procesar la foto de perfil"
      }
    }
  }
} 