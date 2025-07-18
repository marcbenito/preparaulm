"use server"


import { createClient } from "@/utils/supabase/server"
import {
  RegisterUserInput,
  RegisterUserResult,
  RegisterUserUseCase,
} from "@/domain/use-cases/users/RegisterUser"
import {
  ResetPasswordParams,
  ResetPasswordResult,
  ResetPasswordUseCase,
} from "@/domain/use-cases/users/ResetPassword"
import {
  RequestPasswordResetParams,
  RequestPasswordResetResult,
  RequestPasswordResetUseCase,
} from "@/domain/use-cases/users/RequestPasswordReset"

// Define a common result type for actions
export interface ActionResult {
  success: boolean
  error?: string
}


export async function registerAction(
  input: RegisterUserInput
): Promise<ActionResult> {
  const { name, email, password } = input

  // Basic server-side validation (can be enhanced)
  if (!email || !password || !name) {
    return { success: false, error: "Name, email, and password are required." }
  }
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." }
  }

  try {
    console.log("Executing registerAction for:", email)
    
    const registerUseCase = RegisterUserUseCase.create(await createClient())

    const result: RegisterUserResult = await registerUseCase.execute({
      name,
      email,
      password,
    })

    console.log("Registration Result from Use Case:", result)

    if (result.success) {
      // No redirect needed for modal, just success status
      return { success: true }
    } else {
      return { success: false, error: result.error || "Registration failed." }
    }
  } catch (error: any) {
    console.error("registerAction Error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred during registration.",
    }
  }
}



// Request Password Reset Action
export async function requestPasswordResetAction(
  input: RequestPasswordResetParams
): Promise<ActionResult> {
  const { email } = input
  console.log("Requesting password reset for:", email)

  if (!email) {
     return { success: false, error: "Email is required." }
  }

  try {
    const requestPasswordResetUseCase = RequestPasswordResetUseCase.create(await createClient())
    const result = await requestPasswordResetUseCase.execute({ email })
    
    if (result.success) {
      console.log("Password reset email sent successfully")
      return { success: true }
    } else {
      return { 
        success: false, 
        error: result.error || "No se pudo enviar el email de recuperación de contraseña."
      }
    }
  } catch (error: any) {
    console.error("requestPasswordResetAction Error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred requesting password reset.",
    }
  }
}

// Reset Password Action
export async function resetPasswordAction(
  input: ResetPasswordParams
): Promise<ActionResult> {
  const { newPassword } = input

  // Basic server-side validation
  if (!newPassword) {
    return { success: false, error: "Se requiere una nueva contraseña." }
  }
  if (newPassword.length < 8) {
    return { success: false, error: "La contraseña debe tener al menos 8 caracteres." }
  }

  try {
    console.log("Executing resetPasswordAction")
    
    const resetPasswordUseCase = ResetPasswordUseCase.create(await createClient())

    const result: ResetPasswordResult = await resetPasswordUseCase.execute({
      newPassword
    })

    console.log("Reset Password Result from Use Case:", result)

    if (result.success) {
      return { success: true }
    } else {
      return { success: false, error: result.error || "Error al restablecer la contraseña." }
    }
  } catch (error: any) {
    console.error("resetPasswordAction Error:", error)
    return {
      success: false,
      error: error.message || "Ocurrió un error inesperado durante el restablecimiento de contraseña.",
    }
  }
} 