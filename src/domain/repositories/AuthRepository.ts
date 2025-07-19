import { User } from "@/domain/entities/User"
import { SupabaseClient } from "@supabase/supabase-js"
import { UserRole } from "../entities/UserProfile"



export interface AuthResult {
  user: User
  token: string
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthResult | null>
  register(name: string, email: string, password: string): Promise<AuthResult>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
  resetPassword(email: string): Promise<void>
  validateToken(token: string): Promise<User | null>
  updateUser(params: { data: { [key: string]: any } }): Promise<{ data: { user: User | null }, error: Error | null }>
}
export class SupabaseAuthRepository implements IAuthRepository {
  constructor(private readonly supabaseClient: any) { }

  async login(email: string, password: string): Promise<AuthResult | null> {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) return null

    // Crear objeto de usuario a partir de los datos de Supabase
    const role = this.mapRole(data.user.user_metadata?.role)

    const user: User = {
      id: data.user.id,
      email: data.user.email || "",
      createdAt: new Date(data.user.created_at || Date.now()),
      updatedAt: new Date(data.user.updated_at || Date.now()),
    }

    return {
      user,
      token: data.session?.access_token || "",
    }
  }

  async logout(): Promise<void> {
    await this.supabaseClient.auth.signOut()
  }

  async getCurrentUser(): Promise<User | null> {

    const { data } = await this.supabaseClient.auth.getSession()

    if (!data?.session?.user) return null

    const user = data.session?.user

    return {
      id: user.id,
      email: user.email || "",
      createdAt: new Date(user.created_at || Date.now()),
      updatedAt: new Date(user.updated_at || Date.now()),
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthResult> {
    const { data, error } = await this.supabaseClient.auth.signUp({
      email,
      password,
    })

    if (error) throw new Error(error.message)

    const user: User = {
      id: data.user?.id || "",
      email: data.user?.email || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return {
      user,
      token: data.session?.access_token || "",
    }
  }

  async validateToken(token: string): Promise<User | null> {
    // Esta es una implementación básica
    // En una aplicación real, validaríamos el token JWT
    return null
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabaseClient.auth.resetPasswordForEmail(email,
      {
        redirectTo: 'https://www.preparaulm.com/reset-password'
      }
    )
    if (error) throw new Error(error.message)
  }

  // Función auxiliar para mapear strings a UserRole
  private mapRole(roleStr?: string): UserRole {
    if (roleStr === 'INSTRUCTOR' || roleStr === 'instructor') {
      return UserRole.INSTRUCTOR
    } else if (roleStr === 'ADMIN' || roleStr === 'admin') {
      return UserRole.ADMIN
    }
    return UserRole.STUDENT
  }

  async updateUser(params: { data: { [key: string]: any } }): Promise<{ data: { user: User | null }, error: Error | null }> {
    try {
      // Name y phone ahora se gestionan en user_profiles
      const { name, phone, ...otherData } = params.data;

      // Solo actualizamos otros metadatos que no sean name o phone
      const updateData: any = {
        data: {}
      };

      // Añadir otros datos al objeto de metadatos
      Object.entries(otherData).forEach(([key, value]) => {
        // Excluimos name, phone y avatarUrl
        if (key !== 'name' && key !== 'phone' && key !== 'avatarUrl') {
          updateData.data[key] = value;
        }
      });

      // Realizar la actualización solo si hay datos que actualizar
      if (Object.keys(updateData.data).length > 0) {
        const { data, error } = await this.supabaseClient.auth.updateUser(updateData);

        if (error) {
          console.error('Error updating user:', error);
          return { data: { user: null }, error };
        }

        // Mapear los datos de vuelta al objeto User
        const user = data?.user ? {
          id: data.user.id,
          email: data.user.email || "",
          name: "", // Se obtiene desde user_profiles
          phone: "", // Se obtiene desde user_profiles
          role: this.mapRole(data.user.user_metadata?.role),
          createdAt: new Date(data.user.created_at || Date.now()),
          updatedAt: new Date(data.user.updated_at || Date.now()),
        } : null;

        return { data: { user }, error: null };
      }

      // Si no hay nada que actualizar en Auth, simplemente devolvemos el usuario actual
      const currentUser = await this.getCurrentUser();
      return { data: { user: currentUser }, error: null };
    } catch (error) {
      console.error('Error in updateUser:', error);
      return { data: { user: null }, error: error as Error };
    }
  }
  static create(supabaseClient: SupabaseClient): SupabaseAuthRepository {
    return new SupabaseAuthRepository(supabaseClient)
  }
} 