import { IAuthRepository , AuthResult, SupabaseAuthRepository } from "../repositories/AuthRepository"
import { User } from "../entities/User"
import { SupabaseClient } from "@supabase/supabase-js"


export interface AuthService {
  login(email: string, password: string): Promise<AuthResult | null>
  register(name: string, email: string, password: string): Promise<AuthResult>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
  resetPassword(email: string): Promise<void>
  validateToken(token: string): Promise<User | null>
  updateUser(params: { data: { [key: string]: any } }): Promise<User | null>
}

export class AuthServiceImpl implements AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}
  
  async login(email: string, password: string): Promise<AuthResult | null> {
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos")
    }
    
    return this.authRepository.login(email, password)
  }
  
  async register(name: string, email: string, password: string): Promise<AuthResult> {
    // Validaciones de dominio
    if (!name || !email || !password) {
      throw new Error("Todos los campos son requeridos")
    }
    
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres")
    }
    
    return this.authRepository.register(name, email, password)
  }
  
  async logout(): Promise<void> {
    return this.authRepository.logout()
  }
  
  async getCurrentUser(): Promise<User | null> {
    return this.authRepository.getCurrentUser()
  }
  
  async resetPassword(email: string): Promise<void> {
    if (!email) {
      throw new Error("Email es requerido")
    }
    
    return this.authRepository.resetPassword(email)
  }
  
  async validateToken(token: string): Promise<User | null> {
    if (!token) {
      return null
    }
    
    return this.authRepository.validateToken(token)
  }

  async updateUser(params: { data: { [key: string]: any } }): Promise<User | null> {
    const { data: { user }, error } = await this.authRepository.updateUser(params)
    if (error) throw error
    return user
  }
  static create(supabaseClient: SupabaseClient): AuthService {
    const authRepository = SupabaseAuthRepository.create(supabaseClient)
    return new AuthServiceImpl(authRepository)
  }
} 