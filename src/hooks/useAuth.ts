import { useState } from 'react'
import { AuthService } from '@/domain/services/AuthServiceImpl'
import { AuthResult } from '@/domain/repositories/AuthRepository'

interface UseAuthProps {
  authService: AuthService
}

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<AuthResult | null>
  isLoading: boolean
  error: string | null
}

export function useAuth({ authService }: UseAuthProps): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await authService.login(email, password)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading,
    error
  }
} 