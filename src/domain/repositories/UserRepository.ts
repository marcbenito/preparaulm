import { SupabaseClient, User } from "@supabase/supabase-js";
import { UserProfile } from "@/domain/entities/UserProfile";




export class UserRepository {
  constructor(private supabase: any) {}

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('user_id, name, phone, avatar_url')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return {
      id: data.user_id,
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      phone: data.phone,
      avatarUrl: data.avatar_url
    }
  }

  async getUserAvatar(userId: string): Promise<string | null> {
    const profile = await this.getUserProfile(userId);
    return profile?.avatarUrl || null;
  }

  async getUserName(userId: string): Promise<string | null> {
    const profile = await this.getUserProfile(userId);
    return profile?.name || null;
  }

  async getUserPhone(userId: string): Promise<string | null> {
    const profile = await this.getUserProfile(userId);
    return profile?.phone || null;
  }

  async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<boolean> {
    // Intentamos actualizar primero
    const { error: updateError } = await this.supabase
      .from('user_profiles')
      .update({
        name: profile.name,
        phone: profile.phone,
        updated_at: new Date(),
        avatar_url: profile.avatarUrl
      })
      .eq('user_id', userId);
    
    // Si no existe el perfil, lo creamos
    if (updateError && updateError.code === 'PGRST116') {
      const { error: insertError } = await this.supabase
        .from('user_profiles')
        .insert([{ 
          user_id: userId, 
          name: profile.name,
          phone: profile.phone,
          avatar_url: profile.avatarUrl
        }]);
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
        return false;
      }
      return true;
    }
    
    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return false;
    }
    
    return true;
  }
  async createUserProfile(userId: string, profile: Partial<UserProfile>): Promise<boolean> {

    const { error: insertError } = await this.supabase
      .from('user_profiles')
      .insert([{ 
        user_id: userId, 
        name: profile.name,
      }]);
    
    if (insertError) {
      console.error('Error creating profile:', insertError);
      return false;
    }
    return true;

  }

  async updateAvatarUrl(userId: string, avatarUrl: string): Promise<boolean> {
    return this.updateUserProfile(userId, { avatarUrl });
  }

  async updateName(userId: string, name: string): Promise<boolean> {
    return this.updateUserProfile(userId, { name });
  }

  async updatePhone(userId: string, phone: string): Promise<boolean> {
    return this.updateUserProfile(userId, { phone });
  }

  async isInstructor(userId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error checking instructor status:', error);
      return false;
    }
    
    return data?.role === 'instructor';
  }

  static create(supabaseClient: SupabaseClient): UserRepository {
    return new UserRepository(supabaseClient)
  }
} 