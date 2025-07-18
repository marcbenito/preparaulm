import { Subscription } from "@/domain/entities/Subscription";
import { SupabaseClient } from "@supabase/supabase-js";

export interface SubscriptionRepository {
    getUserSubscription(userId: string): Promise<Subscription | null>
  } 

export class SupabaseSubscriptionRepository implements SubscriptionRepository {
  constructor(private supabase: any) {}

  async getUserSubscription(userId: string): Promise<Subscription | null> {
    try {
      const { data, error } = await this.supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching subscription:", error);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        user_id: data.user_id,
        plan_id: data.plan_id,
        status: data.status,
        current_period_start: data.current_period_start,
        current_period_end: data.current_period_end,
        cancel_at_period_end: data.cancel_at_period_end,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error("Error getting user subscription:", error);
      return null;
    }
  }
  static create(supabaseClient: SupabaseClient): SupabaseSubscriptionRepository {
    return new SupabaseSubscriptionRepository(supabaseClient)
  }
} 