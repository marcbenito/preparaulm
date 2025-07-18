
export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired'
}

export class Subscription {
  
  constructor( 
    public id: string,
    public user_id: string,
    public plan_id: string,
    public status: SubscriptionStatus,
    public current_period_start: string,
    public current_period_end: string,
    public cancel_at_period_end: boolean,
    public created_at: string,
    public updated_at: string
  ){}
}


