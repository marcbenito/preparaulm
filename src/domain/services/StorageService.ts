import { SupabaseClient } from "@supabase/supabase-js"

export interface UploadImageParams {
  file: File
  bucketName: string
  folderPath: string
  userId?: string
  fileConstraints?: {
    maxSize: number
    acceptedTypes: string[]
  }
}

export interface UploadImageResult {
  publicUrl?: string
  error?: string
}

export interface StorageService {
  uploadImage(params: UploadImageParams): Promise<UploadImageResult>
}

export class SupabaseStorageService implements StorageService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async uploadImage(params: UploadImageParams): Promise<UploadImageResult> {
    const { file, bucketName, folderPath, userId, fileConstraints } = params

    try {
      // Validar el tamaño del archivo si se especifican restricciones
      if (fileConstraints?.maxSize && file.size > fileConstraints.maxSize) {
        return {
          error: `La imagen excede el tamaño máximo de ${fileConstraints.maxSize / (1024 * 1024)}MB`
        }
      }

      // Validar el tipo de archivo si se especifican restricciones
      if (fileConstraints?.acceptedTypes && !fileConstraints.acceptedTypes.includes(file.type)) {
        return {
          error: `Formato de imagen no válido. Formatos aceptados: ${fileConstraints.acceptedTypes.join(", ")}`
        }
      }

      // Generar un nombre de archivo único
      const fileExt = file.name.split(".").pop()
      const uniqueId = userId || Math.random().toString(36).substring(2)
      const fileName = `${uniqueId}-${Date.now()}.${fileExt}`
      const filePath = `${folderPath}/${fileName}`

      // Subir el archivo a Supabase Storage
      const { error: uploadError } = await this.supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file, {
          upsert: true,
          cacheControl: "3600"
        })

      if (uploadError) {
        console.error("Error al subir el archivo:", uploadError)
        return {
          error: "Error al subir el archivo. Inténtalo de nuevo."
        }
      }

      // Obtener la URL pública
      const { data: publicUrlData } = this.supabaseClient.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      if (!publicUrlData?.publicUrl) {
        return {
          error: "No se pudo obtener la URL pública"
        }
      }

      return {
        publicUrl: publicUrlData.publicUrl
      }
    } catch (error) {
      console.error("Error en el servicio de almacenamiento:", error)
      return {
        error: "Error inesperado al subir la imagen. Inténtalo de nuevo."
      }
    }
  }
} 